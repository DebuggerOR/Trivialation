var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var player = require('./playerModel');

let gameSchema = new mongoose.Schema({
    player: {type: Schema.Types.ObjectId, ref: 'player'},
    score: Number,
    avg_time: Number,
    game_date: Date,
    catagory: String,
    level: String
});

let Game = mongoose.model('game', gameSchema);

module.exports = Game;