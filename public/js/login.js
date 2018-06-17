// // Get the modal
// var modal = document.getElementById('id01');
//
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

$(document).ready(function(){
    $("#login-div").show();
    $("#signup-div").hide();
});


$("#login-btn").click((event)=>{
    let username = $("#uname").val;
    let password = $("#psw").val;

    $.ajax('/login', {
        method: "POST",
        data: {
            username: username,
            password: password
        },
        success: function(data) {
            console.log(data);
            // TODO: need to replace html to game instead of login
        },
        error: function(data) {
            console.log('Error: ' + data);
            // TODO: write it is an error
        }
    });
});

$("#cact-btn").click((event)=>{
    $("#login-div").hide();
    $("#signup-div").show();
});

$("#cls-signup").click(() => {
    $("#signup-div").hide();
    $("#login-div").show();
});

$("#signup-btn").click(()=>{
    $.post('/signup', { username: username, password : pw},
        function(returnedData){
            $("#signup-div").hide();
            $("#login-div").hide();
        }).fail(function(){
        console.log("error");
    });
})