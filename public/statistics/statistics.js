 class Statistics {

     constructor(game) {
         this.game = game;
     }



    
     getMaxScore(){
        return $.ajax({
             method: "GET",
             url: '/stat-record',
             success:(postsResult) => {
                 console.log(postsResult);
                 for(var post of postsResult){  
                    this.posts.push({_id:post._id, text: post.text, comments: post.comments});
                 } 
             },
             error: function (jqXHR, textStatus, errorThrown) {
                 console.log(textStatus);
             }
         });
        }



        

 }