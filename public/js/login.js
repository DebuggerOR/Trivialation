// on start
$(document).ready(function(){
    $("#login-div").show();
    $("#signup-div").hide();
    $("#login-err-msg").hide();
    $("#signup-err-msg").hide();
});

// create account in login page screen
$("#cact-btn").click((event)=>{
    $("#login-div").hide();
    $("#signup-div").show();
});

// when clock on cancle button in sign-up screen
$("#cls-signup").click(() => {
    $("#signup-div").hide();
    $("#login-div").show();
});

// Create player when user clicks create account
$("#signup-btn").click(()=>{
    // get user name and password
    let username = $("#signup-uname").val();
    let pw = $("#signup-psw").val();

    // post the player details
    $.ajax('/signup', {
        method: "POST",
        data: { username: username, password : pw},
        success: function(data) {
            $("#signup-div").hide();
            $("#login-div").hide();
        },
        error: function(data) {
            $("#signup-err-msg").show();
            console.log('Error: ' + data);
        }
    });
})

// login username
$("#login-btn").click((event)=>{
    let username = $("#login-uname").val();
    let password = $("#login-psw").val();

    $.ajax('/login', {
        method: "POST",
        data: {
            username: username,
            password: password
        },
        success: function(data) {
            $("#signup-div").hide();
            $("#login-div").hide();
        },
        error: function(data) {
            $("#login-err-msg").show();
            console.log('Error: ' + data);
        }
    });
});