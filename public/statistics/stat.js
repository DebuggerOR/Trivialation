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
                 console.log(this.array);
             },
             error: function (jqXHR, textStatus, errorThrown) {
                 console.log(textStatus);
             }
         })
     }

     statCalculation() {
         //nb games played
         var nbGamesPlayed = this.array.length;

        //last game 
         var last_doc = this.array[nbGamesPlayed - 1];

         //nb of right answers      
         var rightAnswers = last_doc.right_answers;

         //average speed
         let avgSpeed = last_doc.avg_speed;

         //score
         let finalScore = last_doc.score;

         //rank 
         var _rank = 1;
         var i;
         for (i = 0; i < nbGamesPlayed - 1; i++)
             if (this.array[i].score > score)
                 rank++;

         //record   
         var maxScore;
         $.ajax({
             method: "GET",
             url: '/max-score/' + player,
             success: (data) => {
                 maxScore = data;
             },
             error: function (jqXHR, textStatus, errorThrown) {
                 console.log(textStatus);
             }
         })


         //***********HANDLEBAR************* */

         // Retrieve the template data from the HTML (jQuery is used here).
         var template = $('#handlebars-stat').html();

         // Compile the template data into a function
         var templateScript = Handlebars.compile(template);

         var context = {
             "right_answers": rightAnswers,
             "avg_speed": avgSpeed,
             "score": finalScore,
             "record": maxScore,
             "rank": _rank,
             "nb_games_played": nbGamesPlayed
         };

         // html = 'My name is Ritesh Kumar. I am a developer.'
         var html = templateScript(context);

         // Insert the HTML code into the page
         $('.configure-game-container').append(html);


     }





 }

 export default Stat