 import Game from './game/game.js' ;
 import Login from './login/login.js';

let player = {username: 'Yocheved', password: "fkdxlxjgkj"};

// Wait to PostsRepository do Async call

$( document ).ready(function() {
    $("#includedContent").load("./login/login.html", function(){
        let login = new Login();
        let game = new Game(login);
        

    });
});