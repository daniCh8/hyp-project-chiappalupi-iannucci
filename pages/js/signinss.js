$(document).ready(() => {

    isUserLoggedIn(function(loggato) {
        if (loggato) {
            window.location.replace("secretsanta.html");
        } else {
            drawLoginForm();
        }
    });

});


function isUserLoggedIn(callBack) {
    jQuery.ajax({
        url: 'https://hyp-2019-chiappalupi-iannucci.herokuapp.com/ssanta/target',
        type: 'GET',
        dataType: 'json',
        credentials: 'same-origin',
        Origin: "https://hyp-2019-chiappalupi-iannucci.herokuapp.com",
        success: () => {
            console.log('ajax success');
            callBack(true);
        },
        error: () => {
            callBack(false);
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
        url: "https://hyp-2019-chiappalupi-iannucci.herokuapp.com/ssanta/login",
        Origin: "https://hyp-2019-chiappalupi-iannucci.herokuapp.com",
        type: 'POST',
        dataType: 'json',
        data: credential,
        xhrFields: {
            withCredentials: true
        },
        success: () => {
            $("#loginButton").removeClass("disabled");
            console.log('ajax success');
            window.location.replace("secretsanta.html");

        },
        error: (result)=>{
            $("#loginButton").removeClass("disabled");
            notifyerror(result.responseJSON.errorMessage);
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
        url: "https://hyp-2019-chiappalupi-iannucci.herokuapp.com/ssanta/register",
        type: 'POST',
        dataType: 'json',
        data: credential,
        Origin: "https://hyp-2019-chiappalupi-iannucci.herokuapp.com",
        success: () => {
            $("#registerButton").removeClass("disabled");
            console.log('ajax success');
            window.location.replace("secretsanta.html" );
        },
        error: (result)=>{
            $("#registerButton").removeClass("disabled");
            notifyerror(result.responseJSON.errorMessage);
        }
    });
}


function drawLoginForm() {
    var s = '';
    s = s + '<div class="login-html fadeInDown">\n' +
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
        '                    <input type="submit" class="button" onclick="login()" id="loginButton" value="Sign In">\n' +
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
        '                    <input type="submit" class="button" onclick="register()" id="registerButton" value="Sign Up">\n' +
        '                </div>\n' +
        '                <div class="hr"></div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>';
    $("#user").html(s);
}

