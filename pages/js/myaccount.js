$(document).ready(() => {

    isUserLoggedIn(function(loggato) {
        if (loggato) {
            //alert("L'utente è loggato!");
            fetchAccount();
        } else {
            //alert("L'utente NON è loggato!");
            drawLoginForm();
        }
    });
    $("#loginButton").click(login);
    $("#registerButton").click(register);
    $("#logoutButton").click(logout);

});


function isUserLoggedIn(callBack) {
    jQuery.ajax({
        url: 'http://hyp-2019-chiappalupi-iannucci.herokuapp.com/user',
        type: 'GET',
        dataType: 'json',
        credentials: 'same-origin',
        Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
        success: (result) => {
            console.log('ajax success');
            callBack(true);
        },
        error: (result) => {
            callBack(false);
            console.log('ajax error')
            console.log(result.errorMessage)
            notifyerror(result.errorMessage);
        }
    });
}

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
        Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
        type: 'POST',
        dataType: 'json',
        data: credential,
        xhrFields: {
            withCredentials: true
        },
        success: (result) => {
            $("#loginButton").removeClass("disabled");
            console.log('ajax success');

            if(result.success){
                alert("L'utente è loggato!");

                /*

                isUserLoggedIn(function(loggato) {
                    if (loggato==true) {
                        alert("L'utente è loggato!");
                    } else {
                        alert("L'utente NON è loggato!");
                    }
                });

                 */
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

function logout(){
    $("#logoutButton").addClass("disabled");
    jQuery.ajax({
        url: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com/user/logout",
        Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
        type: 'POST',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: () => {
            $("#logoutButton").removeClass("disabled");
            console.log('ajax success');
            drawLoginForm();
        },
        error: ()=>{
            $("#logoutButton").removeClass("disabled");
            notifyerror("qualcosa è andato storto");
        }
    });

}

function register(){
    $("#registerButton").addClass("disabled");
    var username = $('#usernameReg').val();
    var password = $('#passwordReg').val();
    var firstName = $('#firstname').val();
    var lastName = $('#lastname').val();
    var email = $('#email').val();
    var credential = {
        "username": username,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email
    };
    jQuery.ajax({
        url: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com/user/register",
        type: 'POST',
        dataType: 'json',
        data: credential,
        Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
        success: (result) => {
            $("#registerButton").removeClass("disabled");
            console.log('ajax success');

            if(result.success){
                alert("L'utente è registrato!");

                /*
                isUserLoggedIn(function(loggato) {
                    if (loggato==true) {
                        alert("L'utente è loggato!");
                    } else {
                        alert("L'utente NON è loggato!");
                    }
                });*/

                //window.location.replace("page.html?" + credentials.username);
            }
            else {
                notifyerror(result.errorMessage);
            }
        },
        error: ()=>{
            $("#registerButton").removeClass("disabled");
            notifyerror("qualcosa è andato storto");
        }
    });
}


function fetchAccount() {
    jQuery.ajax({
        url: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com/user",
        type: 'GET',
        dataType: 'json',
        credentials: 'same-origin',
        success: (data) => {
            console.log('ajax success');
            drawAccount(data);
        },
        error: (result)=>{
            notifyerror(result.errorMessage);
        }
    });
}

function drawAccount(data) {
    var s = '';
    s = s + '\n' +
        '<div class="sidenav">\n' +
        '    <div class="login-main-text">\n' +
        '        <h2>Hi ' + data[0].firstName + ',</h2>\n' +
        '        <p>Here you may find some information about your account.</p>\n' +
        '    </div>\n' +
        '\n' +
        '</div>\n' +
        '<div class="main">\n' +
        '    <div class="accountInfoContainer fadeInDown">\n' +
        '        <p class="topic-section-big"> <strong>Name:  </strong>' + data[0].firstName + '' + data[0].lastName + '</p>\n' +
        '        <p class="topic-section-big">    <strong>Username:  </strong>' + data[0].username + '</p>\n' +
        '        <p class="topic-section-big">    <strong>E-mail:  </strong>' + data[0].email + '</p>\n' +
        ''+
        '\n' +
        '    </div>\n' +
        '</div>'
    $("#user").html(s);
}

function drawLoginForm() {
    var s = '';
    s = s + '<div class="login-html">\n' +
        '        <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label>\n' +
        '        <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign Up</label>\n' +
        '        <div class="login-form">\n' +
        '            <div class="sign-in-htm">\n' +
        '                <div class="group">\n' +
        '                    <label for="username" class="label">Username</label>\n' +
        '                    <input id="username" type="text" class="input">\n' +
        '                </div>\n' +
        '                <div class="group">\n' +
        '                    <label for="password" class="label">Password</label>\n' +
        '                    <input id="password" type="password" class="input" data-type="password">\n' +
        '                </div>\n' +
        '                <div class="group">\n' +
        '                    <input type="submit" class="button" value="Sign In">\n' +
        '                </div>\n' +
        '                <div class="hr"></div>\n' +
        '\n' +
        '            </div>\n' +
        '            <div class="sign-up-htm">\n' +
        '                <div class="group">\n' +
        '                    <label for="firstname" class="label">First Name</label>\n' +
        '                    <input id="firstname" type="text" class="input">\n' +
        '                </div>\n' +
        '                <div class="group">\n' +
        '                    <label for="lastname" class="label">Last Name</label>\n' +
        '                    <input id="lastname" type="text" class="input">\n' +
        '                </div>\n' +
        '                <div class="group">\n' +
        '                    <label for="usernameReg" class="label">Username</label>\n' +
        '                    <input id="usernameReg" type="text" class="input">\n' +
        '                </div>\n' +
        '                <div class="group">\n' +
        '                    <label for="email" class="label">Email</label>\n' +
        '                    <input id="email" type="text" class="input">\n' +
        '                </div>\n' +
        '                <div class="group">\n' +
        '                    <label for="passwordReg" class="label">Password</label>\n' +
        '                    <input id="passwordReg" type="password" class="input" data-type="password">\n' +
        '                </div>\n' +
        '                <div class="group">\n' +
        '                    <input type="submit" class="button" value="Sign Up">\n' +
        '                </div>\n' +
        '                <div class="hr"></div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>';
    $("#user").html(s);
}