
class Game {
    constructor(player) {
        this.player = player;
        this.player.token = "6d6ff30c5e99463e3c47c9b116b82a927df610248001b5cc9a02fb69f1a4e07c";
        this.current_question_index = 0;
        this.total_questions = 10;
        this.total_time = 0;
        this.seconds_per_question = 10;
    }

    registerGameEvents() {
        let that = this;
        let $container = $('.configure-game-container');

        //populate catagory array when documents load 
        $(document).ready(function () {
            that.loadConfigureGameHandlebar();
        });


        //START GAME BUTTON CLICK EVENT
        $container.on('click', '.start-game-btn', function () {
            let $set_game_container = $(this).closest('.set-game-container');
            let t = $set_game_container.find("#trivia_category");
            let catagory_id = $set_game_container.find("#trivia_category").val();
            let difficulty = $set_game_container.find("#trivia_difficulty").val();
            $container.empty();
            that.getGameAPI(catagory_id, difficulty);
        })

        //CLICK ON ANSWER EVENT


    }

   

    //populate catagory array from API 
    loadConfigureGameHandlebar() {
        $.ajax({
            method: "POST",
            url: 'https://opentdb.com/api_category.php',
            dataType: "json",
            success: (data) => {
                var theCompiledHtml = Handlebars.templates.set_game(data);
                $('.configure-game-container').append(theCompiledHtml);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });

    }

    getGameAPI(catagory_id, difficulty) {
        let api_url = "https://opentdb.com/api.php?amount=10&type=multiple";

        //create api url string (encoded in base64)
        if (catagory_id != 1) {
            api_url += "&category=";
            api_url += catagory_id;
        }
        if (difficulty != "any") {
            api_url += "&difficulty=";
            api_url += difficulty;
        }
        //api_url += "&token=" + this.player.token;
        api_url += "&encode=base64";

        $.ajax({
            method: "POST",
            url: api_url,
            dataType: "json",
            success: (data) => {

                console.log(data);
                this.catagory_id = catagory_id;
                this.difficulty = this.difficulty;
                this.questions = data.results;


                this.playGame();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });

    }

    playGame() {
        this.displayQuestion(this.questions[this.current_question_index]);
    }

    displayQuestion(q) {
        let that = this;
        //decode quesiton from base64
        q.question = atob(q.question);
        q.answers = [];
        q.incorrect_answers.forEach(function (elem) { q.answers.push({ answer: elem }); });
        q.correct_index = Math.floor(Math.random() * 3);
        q.answers.splice(q.correct_index, 0, { answer: q.correct_answer });
        //decode answers from base64
        q.answers.forEach(function (a) { a.answer = atob(a.answer) });
        q.question_number = this.current_question_index + 1;
        q.total = this.total_questions;

        //compile and append handlebar to index.html
        let theCompiledHtml = Handlebars.templates.question(q);
        $('.configure-game-container').append(theCompiledHtml).hide().fadeIn(300);


        //add class 'correct' to the correct answer
        $('.answers-container  div:nth-child(' + (q.correct_index + 1) + ')').find('.answer').addClass('correct');


        //set the timer for question
        let downloadTimer = this.setTimer(10);


        //register event when answer is clicked
        $('.answer').on('click', function () {
            that.clickedAnswer($(this), downloadTimer);

        });
    }


    clickedAnswer($clicked_answer, downloadTimer) {
        $('.answer').off();
        //if answer is incorrect display in red
        if (!$clicked_answer.hasClass('correct')) {
            $clicked_answer.css("background-color", '#d40e0e');
        }

        //flash the correct answer in green (also if clicked)
        this.flashGreen();
        //add to the total how many seconds it took to answer the question
        this.total_time += (this.seconds_per_question - this.timeleft);
        clearInterval(downloadTimer);
        setTimeout(() => {
            this.onToNextQuestion();
        }, 2000)

    }

    setTimer(seconds) {
        let that = this;
        this.timeleft = 10;
        let downloadTimer = setInterval(() => {
            this.timeleft--;
            $(".timer").text(that.timeleft);
            if (this.timeleft <= 0) {
                if(this.timeleft == 0)
                    $(".timer").text(that.timeleft);
                $('.answer').off();
                this.flashGreen();
                clearInterval(downloadTimer);
                this.total_time += (this.seconds_per_question - this.timeleft);
                setTimeout(() => {
                    this.onToNextQuestion(); 
                }, 2000);
               
            }
        }, 1000);
        return downloadTimer;
    }

    //flash the correct answer in green
    flashGreen() {
        let $correct = $('.answers-container').find('.correct');
        $correct.css("background-color", '#18d431');
        $correct.fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    }

    onToNextQuestion(){
        $('.configure-game-container').empty();
        if (this.current_question_index < this.total_questions - 1) {
            //run the next quesition;  
            this.displayQuestion(this.questions[++this.current_question_index]);
        }
    }
    

}


export default Game