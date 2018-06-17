import Repository from './controllers/repository.js' ;
import Renderer from './controllers/renderer.js';
import EventsHandler from './controllers/events-handler.js';


// Wait to PostsRepository do Async call
var repository = new Repository();
repository.init(function() {
    let renderer = new Renderer();
    let eventsHandler = new EventsHandler(this, renderer);
  
});


$( document ).ready(function() {
   loadConfigureGameHandlebar();
});


let  loadConfigureGameHandlebar = function () {
    let source   = $('#set-game-template').html();
    let template = Handlebars.compile(source);

    $.ajax({
        method: "POST",
        url: 'https://opentdb.com/api_category.php',
        dataType: "json",
        success: (data) =>{
            console.log(data);
            let theCompiledHtml = template(data);
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
