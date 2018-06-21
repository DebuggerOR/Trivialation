var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var player = require('./playerModel');


let gameSchema = new mongoose.Schema({
    player: {type: Schema.Types.ObjectId, ref: 'player'},
    right_answers: Number,
    avg_speed: Number,
    score: Number,
    game_date: {type: Date, default: Date.now },
    category_name: String,
    difficulty: String
 });

let Game = mongoose.model('game', gameSchema);

module.exports = Game;