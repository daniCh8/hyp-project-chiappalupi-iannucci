"use strict";




function login(){
    $("#loginButton").addClass("disabled");
   var username = $('#username').val();
   var password = $('#password').val();
   var credential = {
       "username": username,
       "password": password,
   };
    jQuery.ajax({
        url: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com/user/login",
        type: 'POST',
        dataType: 'json',
        data: credential,
        credentials: 'same-origin',
        success: (result) => {
            $("#loginButton").removeClass("disabled");
            console.log('ajax success');

            if(result.success){
                alert("L'utente è loggato!");

                isUserLoggedIn(function(loggato) {
                    if (loggato==true) {
                        alert("L'utente è loggato!");
                    } else {
                        alert("L'utente NON è loggato!");
                    }
                });

                //window.location.replace("page.html?" + credentials.username);
            }
            else {
                notifyerror(result.errorMessage);
            }
        },
        error: ()=>{
            $("#loginButton").removeClass("disabled");
            notifyerror("qualcosa è andato storto");
        }
    });

}

function draw(username, password){
    var s = '';
    s = s + '<p class="paragraph-fav-best"> Hi' + username + ' your password is ' + password + ' and I have just hacked you MUAHAHAHA </p>';
    $('#draw').html(s)
}



$(document).ready(() => {
    $("#loginButton").click(login);
});