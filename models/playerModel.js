var mongoose = require('mongoose');


let playerSchema = new mongoose.Schema({
    username: String,
    password: String,

});

let Player = mongoose.model('player', playerSchema)

module.exports = Player;