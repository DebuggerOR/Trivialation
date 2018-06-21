class Login{
    constructor(){
        this.registerLoginEvents();
    }

    registerLoginEvents(){
        this.showLoginDivOnStart();
        this.checkPasswordMatching();
        this.showSignUpDiv();
        this.closeSignUpDiv();
        this.signUp();
        this.loginUser();
    }

    getCurrentPlayer(){
        return this.currentPlayer;
    }

    showLoginDivOnStart(){
        // on start
        $(document).ready(function(){
            $("#login-div").show();
            $("#signup-div").hide();
            $("#login-err-msg").hide();
            $("#signup-err-msg").hide();
        });
    }

    checkPasswordMatching(){
        $('#password, #confirm_password').on('keyup', function () {
            if ($('#signup-psw').val() == $('#confirm_password').val()) {
                $('#message').html('Matching').css('color', 'green');
            } else
                $('#message').html('Not Matching').css('color', 'red');
        });
    }

    showSignUpDiv(){
        // create account in login page screen
        $("#cact-btn").click((event)=>{
            $("#login-div").hide();
            $("#signup-div").show();
        });
    }

    closeSignUpDiv(){
        // when clock on cancle button in sign-up screen
        $("#cls-signup").click(() => {
            $("#signup-div").hide();
            $("#login-div").show();
        });
    }

    signUp(){
        // Create player when user clicks create account
        $("#signup-btn").click(()=>{
            // get user name and password
            let username = $("#signup-uname").val();
            let password = $("#signup-psw").val();
            let remember = $("#signup-remember").is(":checked");

            // post the player details
            $.ajax('/signup', {
                method: "POST",
                data: {
                    username: username,
                    password: password,
                    rememberMeChecked: remember
                },
                success: function(data) {
                    // player returns from server
                    this.currentPlayer = data;
                    $("#signup-div").hide();
                    $("#login-div").hide();
                },
                error: function(data) {
                    $("#signup-err-msg").text(data.responseText).show();
                    console.log('Error: ' + data);
                }
            });
        })
    }

    loginUser(){
        // login username
        $("#login-btn").click((event)=>{
            let username = $("#login-uname").val();
            let password = $("#login-psw").val();
            let remember = $("#login-remember").is(":checked");

            $.ajax('/login', {
                method: "POST",
                data: {
                    username: username,
                    password: password,
                    rememberMeChecked: remember
                },
                success: function(data) {
                    // player returns from server
                    this.currentPlayer = data;
                    $("#signup-div").hide();
                    $("#login-div").hide();
                },
                error: function(data) {
                    $("#login-err-msg").text(data.responseText).show();
                    console.log('Error: ' + data);
                }
            });
        });
    }
}

export default Login