 class Stat {

     constructor(game) {
         this.game = game;
         this.array = []; //all documents
     }

     fetchArrayOfDoc(player) {
         $.ajax({
             method: "GET",
             url: '/array-of-doc/' + player,
             success: (data) => {
                 this.array.push(data);
                 alert(this.array);
             },
             error: function (jqXHR, textStatus, errorThrown) {
                 console.log(textStatus);
             }
         })
     }

     statCalculation() {
         //nb games played
         var nb_games_played = this.array.length;

        //last game 
         var last_doc = this.array[nb_games_played - 1]

         //nb of right answers      
         var right_answers = last_doc[0];

         //average speed
         let avg_speed = last_doc[2];

         //score
         let score = last_doc[3];

         //rank 
         var rank = 1;
         var i;
         for (i = 0; i < nb_games_played - 1; i++)
             if (this.array[i].score > score)
                 rank++;

         //record   
         var record;
         $.ajax({
             method: "GET",
             url: '/max-score/' + player,
             success: (data) => {
                 record = data;
             },
             error: function (jqXHR, textStatus, errorThrown) {
                 console.log(textStatus);
             }
         })




         // Retrieve the template data from the HTML (jQuery is used here).
         var template = $('#handlebars-stat').html();

         // Compile the template data into a function
         var templateScript = Handlebars.compile(template);

         var context = {
             "Right Answers": right_answers,
             "Average Speed": avg_speed,
             "Score": score,
             "Personal Record": record,
             "Historical Rank": rank,
             "Number of Games Played": nb_games_played
         };

         // html = 'My name is Ritesh Kumar. I am a developer.'
         var html = templateScript(context);

         // Insert the HTML code into the page
         $('.configure-game-container').append(html);


     }





 }