const mongoose = require('mongoose');
const axios = require('axios');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

let playerSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    token: String,
    timeInSeconds: Number
});

// Enable beautifying on this schema
playerSchema.plugin(beautifyUnique);

let Player = mongoose.model('player', playerSchema)

// functions
let savePlayerToDB = function (username, password) {
    return getValidToken().then((token)=>{
        let player = new Player({username: username, password: password, token: token, timeInSeconds: new Date().getTime() / 1000});
        return player.save();
    })
};

let getPlayerFromDB = function (username, password) {
    return Player.find({ username: username, password: password }).then((player)=> {
        // After 6 hours need to get a new Token
        if(new Date().getTime() / 1000 - player[0].timeInSeconds > 21600){
            return getValidToken().then((validToken) => {
                var query = {_id: player[0].id};
                return Player.findOneAndUpdate(query, {token: validToken, timeInSeconds: new Date().getTime() / 1000}, {new: true});
            });
        }
        else{
            return player[0];
        }
    });
};

let getValidToken = function(){
    return axios.get('https://opentdb.com/api_token.php?command=request').then((token)=>{
        return token.data.token;
    });
};

module.exports.Player = Player;
module.exports.getPlayerFromDB = getPlayerFromDB;
module.exports.savePlayerToDB = savePlayerToDB;