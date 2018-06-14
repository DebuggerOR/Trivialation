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
    $("#login-div").style.display='block';
    $("#signup-div").style.display='none';
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
    $("#login-div").style.display='none';
    $("#signup-div").style.display='block';
});