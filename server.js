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

mongoose.connect('mongodb://localhost/trivialationDB', function () {
    console.log("DB connection established!!!");
});

app.post('/signup', function (request, response) {
    let username = request.body.username;
    let password = request.body.password;
    let rememberMeChecked = request.body.rememberMeChecked;

    // save player to DB
    Player.savePlayerToDB(username, password).then((player) => {
        // if(rememberMeChecked){
        //     // TODO: Add to local storage if remember me
        // }

        let currPlayer = {
            username: player.username,
            password: player.password,
            token: player.token,
            timeInSeconds: player.timeInSeconds,
            userId: player.id
        }
        response.send(currPlayer);
    }).catch((err) => {
        response.status(500);
        response.send(helper.replaceAll(err.errors.username.message, { "path": "", "not unique": "already taken" }));
    });
});

app.get('/updatePlayerToken', function (request, response) {
    let username = request.query.username;
    let password = request.query.password;
    let rememberMeChecked = false;

    sendPlayerToClient(request, response, rememberMeChecked, username, password);
});

app.post('/login', function (request, response) {
    let username = request.body.username;
    let password = request.body.password;
    let rememberMeChecked = request.body.rememberMeChecked;

    sendPlayerToClient(request, response, rememberMeChecked, username, password);
});

// getPlayerFromDB return player with valid token
let sendPlayerToClient = function(request, response, rememberMeChecked, username, password){
    Player.getPlayerFromDB(username, password).then((player)=>{
        // if(rememberMeChecked){
        //     // TODO: Add to local storage if remember me
        // }

        let currPlayer = {
            username: player.username,
            password: player.password,
            token: player.token,
            timeInSeconds: player.timeInSeconds,
            userId: player.id,
        }
        response.send(currPlayer);
    }).catch((err) => {
        response.status(500);
        response.send("username/password are wrong");
    });
}

app.post('/game', function (request, response) {
    let game = request.body;
    console.log(game);
    Game.saveGameToDB(game).then((savedGame) => {
        response.send(savedGame);
    }).catch((err) => console.log(err));
});