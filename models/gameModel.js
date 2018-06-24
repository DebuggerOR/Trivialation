var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var player = require('./playerModel');


let gameSchema = new mongoose.Schema({
    player: {type: Schema.Types.ObjectId, ref: 'player'},
    right_answers: Number,
    score: Number,
    avg_speed: Number,
    game_date: {type: Date, default: Date.now },
    category_name: String,
    catagory_id: Number,
    difficulty: String
});

let Game = mongoose.model('game', gameSchema);

// functions
let saveGameToDB = function (game_object) {
    let game = new Game(game_object);
    return game.save();
};



module.exports.Game = Game;
module.exports.saveGameToDB = saveGameToDB;