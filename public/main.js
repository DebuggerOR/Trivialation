 import Game from './game/game.js' ;

let player = {username: 'Yocheved', password: "fkdxlxjgkj"};

// Wait to PostsRepository do Async call
let game = new Game(player);

game.registerGameEvents();


$( document ).ready(function() {
    $("#includedContent").load("./login/login.html");
 });



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
