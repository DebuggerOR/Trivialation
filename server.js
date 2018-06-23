var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const SERVER_PORT = 8000;

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// var http = require('http');
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/MYDB";

/**
 * Connect to port 8080.
 */
app.listen(process.env.PORT || SERVER_PORT, () => {
    console.log("Server started on port " + SERVER_PORT);
});


mongoose.connect('mongodb://localhost/trivialationDB', function() {
    console.log("DB connection established!!!");
 });


var Player = require('./models/playerModel');
var Game = require('./models/gameModel.js');


app.post('/signup', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;

    // TODO: save username to players db
    // TODO: Add to local storage

    var status = "ok";
    if(status){
        response.send("create account success");
    }
});

app.post('/login', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;

    // TODO: check user is in DB
    // TODO: Add to local storage

    var status = "ok";
    if(status){
        response.send("login success");
    }
});



app.get('/stat-record', function(request, response) {
   Game.findOne({ player: '5b2bdf855876fb3f002428ed' })
  .sort('-score')  // give me the max
  .exec(function (error, result) {
    if(error) { return console.error(error); }
            response.send(result.score);
  });
}); 



// app.get('/stat-record', function(request, db) {
//     db.games.aggregate([{$group:{_id: "$player", record:{$max: "$score"}}}], function (error, result){

//         if(error) { return console.error(error); }
//         response.send(result);
//     });
// });


// app.get('/stat-nb-games', function(request, db) {
//     db.games.aggregate( [{ "$unwind": "$player" }, { "$group": { "_id": "$player", "nb_games_played": {"$sum": 1 }}} ],  
//     function (error, result){

//         if(error) { return console.error(error); }
//         response.send(result);
//     });
// });



