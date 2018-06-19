const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

let playerSchema = new mongoose.Schema({
    username: {
        type: 'String',
        unique: true
    },
    password: String,
    token: String
});

// Enable beautifying on this schema
playerSchema.plugin(beautifyUnique);

let Player = mongoose.model('player', playerSchema)

// functions
let savePlayerToDB = function (username, password, token) {
    let player = new Player({username: username, password: password, token: token});

    return player.save();
};

let getPlayerFromDB = function (username, password) {
    return Player.find({ username: username, password: password });
};

module.exports.Player = Player;
module.exports.getPlayerFromDB = getPlayerFromDB;
module.exports.savePlayerToDB = savePlayerToDB;