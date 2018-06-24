 class Stat {

     constructor(game) {
         this.game = game;
         this.stat_array=[];

        //nb of right answers      
        this.stat_array.push (this.game.right_answers);

        //average speed
        let avg_speed= this.game.avgspeed();
        this.stat_array.push (avg_speed);

        //score
        let score = this.game.score();
        this.stat_array.push (score);

     }



    //when game over, call fetchStat
     fetchStat(player) {
             $.ajax({
             method: "GET",
             url: '/stat/'+player,
             success:(stat) => {
                 console.log(stat);
                 this.stat_array.push(stat);
             },
             error: function (jqXHR, textStatus, errorThrown) {
                 console.log(textStatus);
             }
        })
    }
  
    
    
    



        

 }