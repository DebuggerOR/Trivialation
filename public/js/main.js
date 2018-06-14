<<<<<<< HEAD:public/main.js
import Repository from './epository.js';
import Renderer from './renderer.js';
import EventsHandler from './events-handler.js';
=======
import PostsRepository from './controllers/posts-repository.js';
import PostsRenderer from './controllers/posts-renderer.js';
import EventsHandler from './controllers/events-handler.js';
>>>>>>> 33d19f0103c4a2c9251fcc7e2100e66e0957cfd5:public/js/main.js

// Wait to PostsRepository do Async call
var repository = new repository();
repository.init(function() {
    let renderer = new renderer();
    let eventsHandler = new EventsHandler(this, renderer);
  
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
