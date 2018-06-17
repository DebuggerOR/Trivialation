var mongoose = require('mongoose');
var player = require('playerModel');

let gameSchema = new mongoose.Schema({
    player_id: player._id,
    score: Number,
    avg_time: Number,
    game_date: Date,
    catagory: String,
    level: String
});

let Game = mongoose.model('game', gameSchema)

module.exports = Game;