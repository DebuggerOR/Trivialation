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

//stat: give me the max\

app.get('/stat/:game.player', function(request, response) {
   var player= req.params.game.player;
   Game.findOne({ player: player})
  .sort('-score')  
  .exec(function (error, result) {
    if(error) { return console.error(error); }
            response.send(result.score);
  });
}); 

//give rank 
app.get('/stat/:game.player', function(request, response) {
    var player= req.params.game.player;
    Game.find({ player: player}, function(error, result) {
    var  last_score=  
  var rank=1;
  if (result[])       
    })
   
 } 
 




//nb games played
app.get('/stat/:game.player', function(request, response) {
    var player= req.params.game.player;
    Game.count({ player: player},function (error, result) {
     if(error) { return console.error(error); }
             response.send(result);
   });
 }); 
 



