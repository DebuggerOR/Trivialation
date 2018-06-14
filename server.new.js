var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var basicAuth = require('basic-auth-connect');

const SERVER_PORT = 8080;
var username;

mongoose.connect('mongodb://localhost/spacebookDB', {useMongoClient: true}, function() {
    console.log("DB connection established!!!");
});

var Post = require('./models/postModel');
var RequestParser = require('./helpers/RequestParser');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(basicAuth(function(user, pass){
    username = user;
    return 'spacebook' == pass;
}))


app.listen(process.env.PORT || SERVER_PORT, () => {
    console.log("Server started on port " + SERVER_PORT);
});

// Connect to Spacebook DataBase
mongoose.connect(process.env.CONNECTION_STRING || 'mongodb://localhost/spacebookDB');


