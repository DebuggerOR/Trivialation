// npm require
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const SERVER_PORT = 8000;
const axios = require('axios');

// require models
const Player = require('./models/playerModel');
const Game = require('./models/gameModel.js');

// require helper ustils
const helper = require('./utils/helper');

// middlewares
const app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Connect to port 8000.
 */
app.listen(process.env.PORT || SERVER_PORT, () => {
    console.log("Server started on port " + SERVER_PORT);
});

mongoose.connect('mongodb://localhost/trivialationDB', function() {
    console.log("DB connection established!!!");
 });

app.post('/signup', function(request, response) {
    let username = request.body.username;
    let password = request.body.password;
    let rememberMeChecked = request.body.rememberMeChecked;

    // get token from api
    axios.get('https://opentdb.com/api_token.php?command=request').then(function(a_res){
        // save player to DB
        return Player.savePlayerToDB(username, password, a_res.data.token);
    }).then(function(player){
        if(rememberMeChecked){
            // TODO: Add to local storage if remember me
        }

        let currPlayer = {
            username: player._doc.username,
            password: player._doc.password
        }
        response.send(currPlayer);
    }).catch(function(err) {
        response.status(500);
        response.send(helper.replaceAll(err.errors.username.message,{"path": "", "not unique": "already taken"}));
    });
});


app.post('/login', function(request, response) {
    let username = request.body.username;
    let password = request.body.password;
    let rememberMeChecked = request.body.rememberMeChecked;

    Player.getPlayerFromDB(username, password).then(function(player){
        if(rememberMeChecked){
            // TODO: Add to local storage if remember me
        }
        let currPlayer = {
            username: player[0]._doc.username,
            password: player[0]._doc.password
        }
        response.send(currPlayer);
    }).catch(function(err) {
        response.status(500);
        response.send("username/password are wrong");
    });
});

