 import Game from './game/game.js' ;
 import Login from './login/login.js';

let player = {username: 'Yocheved', password: "fkdxlxjgkj"};

$( document ).ready(function() {
    $("#includedContent").load("./login/login.html", function(){
        let login = new Login();
    });
});


let  loadConfigureGameHandlebar = function () {
    $.ajax({
        method: "POST",
        url: 'https://opentdb.com/api_category.php',
        dataType: "json",
        success: (data) =>{
            console.log(Handlebars);
            var theCompiledHtml = Handlebars.templates.set_game(data);
            $('.configure-game-container').append(theCompiledHtml);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });

}


/* eventsHandler.registerAddPost();
eventsHandler.registerRemovePost();
eventsHandler.registerToggleEditPost();
eventsHandler.registerEditPost();
eventsHandler.registerToggleComments();
eventsHandler.registerAddComment();
eventsHandler.registerRemoveComment();


//-----Load  all the posts from database when page is loaded--------//



postsRepository.loadPostsFromDB()
.then(() => {postsRenderer.renderPosts(postsRepository.posts)})
.catch(() => {console.log("error in rendering posts")}); */
