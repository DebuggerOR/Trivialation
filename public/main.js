 import Game from './game/game.js' ;
 import Login from './login/login.js';




$( document ).ready(function() {
    $("#includedContent").load("./login/login.html", function(){
        let login = new Login();
    });
});

let game = new Game(login);
game.registerGameEvents();