
class Game {
    constructor(login) {
        this.login = login;
        this.current_question_index = 0;
        this.total_questions = 10;
        this.total_time = 0;
        this.seconds_per_question = 10;
        this.right_answers = 0;
        this.registerGameEvents();
    }

    registerGameEvents() {
        let that = this;
        let $container = $('.configure-game-container');

        //populate category array when documents load 
        $(document).ready(function () {
            that.loadConfigureGameHandlebar();
        });


        //START GAME BUTTON CLICK EVENT
        $container.on('click', '.start-game-btn', function () {
            that.player = that.login.currentPlayer;
            let $set_game_container = $(this).closest('.set-game-container');
            let t = $set_game_container.find("#trivia_category");
            that.category_id = $set_game_container.find("#trivia_category").val();
            that.category_name = $set_game_container.find("#trivia_category option:selected").text();
            that.difficulty = $set_game_container.find("#trivia_difficulty").val();

            that.player = that.login.currentPlayer;

            //if the token is expired (after 6 hours) then generate new token and update the player
            if ((new Date()).getTime() / 1000 - that.player.timeInSeconds > 21600) {
                that.login.updatePlayer(that.player.username, that.player.password).then((updatedPlayer) => {
                    console.log(updatedPlayer);
                    that.player = updatedPlayer;
                });
            }
            $container.empty();
            that.getGameAPI();
        })

        //CLICK ON ANSWER EVENT


    }



    //populate category array from API 
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

    getGameAPI() {
        let api_url = "https://opentdb.com/api.php?amount=10&type=multiple";

        //create api url string (encoded in base64)
        if (this.category_id != 1) {
            api_url += "&category=" + this.category_id;
        }
        if (this.difficulty != "any") {
            api_url += "&difficulty=" + this.difficulty;
        }
        //api_url += "&token=" + this.player.token;
        api_url += "&encode=base64";

        api_url += "&token=" + this.player.token;

        $.ajax({
            method: "POST",
            url: api_url,
            dataType: "json",
            success: (data) => {
                if (data.response_code != 0) {
                    console.log("error in API result");
                }
                console.log(data);
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

        //clicked the correct answers
        else {
            this.right_answers++;
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
                if (this.timeleft == 0)
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

    onToNextQuestion() {
        $('.configure-game-container').empty();
        if (this.current_question_index < this.total_questions - 1) {
            //run the next quesition;  
            this.displayQuestion(this.questions[++this.current_question_index]);
        }

        //end of game
        else {
            this.endGame();
        }




    }

    endGame() {
        this.avg_speed = Math.ceil(this.total_time / this.total_questions);
        this.calculate_final_score();
        $.ajax('/game', {
            method: "POST",
            data: {
                right_answers: this.right_answers,
                player: this.player._id,
                avg_speed: this.avg_speed,
                score: this.final_score,
                category_name: this.category_name,
                catagory_id: this.category_id,
                difficulty: this.difficulty
            },
            success: function (data) {
                console.log("successfully added game to db");
                console.log(data);
            },
            error: function (data) {
                console.log('Error: ' + data);
            }
        });
    }

    calculate_final_score() {
        if (this.right_answers === 0)
            this.final_score = 0;
        else if (this.right_answers === this.total_questions)
            this.final_score = 100;
        else {
            this.final_score = Math.ceil((this.right_answers * (100 / this.total_questions)) +
                ((this.seconds_per_question - this.avg_speed) * 1.5));
        }
    }

}
export default Game