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
            console.log(result.success);
        },
        error: (result) => {
            callBack(false);
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

function register(){
    $("#registerButton").addClass("disabled");
    var username = $('#username').val();
    var password = $('#password').val();
    var firstName = $('#firstnameReg').val();
    var lastName = $('#lastnameReg').val();
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
        url: "https://hyp-2019-chiappalupi-iannucci.herokuapp.com/user",
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
        '        <p class="topic-section-big"> <strong>Name:  </strong>' + data[0].firstName + data[0].lastName + '</p>\n' +
        '        <p class="topic-section-big">    <strong>Username:  </strong>' + data[0].username + '</p>\n' +
        '        <p class="topic-section-big">    <strong>E-mail:  </strong>' + data[0].email + '</p>\n' +
        '\n' +
        '    </div>\n' +
        '</div>'
    $("#user").html(s);
}

function drawLoginForm() {
    var s = '';
    s = s + '<div class="sidenav">\n' +
        '    <div class="login-main-text">\n' +
        '        <h2>Login Page</h2>\n' +
        '        <p>Login or register from here to access.</p>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="main">\n' +
        '    <div class="col-md-6 col-sm-12">\n' +
        '        <div class="login-form loginContainer">\n' +
        '            <p class="paragraph-fav-best">Already registered? Login now!</p>\n' +
        '            <form>\n' +
        '                <div class="form-group">\n' +
        '                    <label>Username</label>\n' +
        '                    <input type="text" class="form-control" id="username" placeholder="Username">\n' +
        '                </div>\n' +
        '                <div class="form-group">\n' +
        '                    <label>Password</label>\n' +
        '                    <input type="password" class="form-control" id="password" placeholder="Password">\n' +
        '                </div>\n' +
        //'                <button type="button" class="btn btn-black" id="loginButton">Login</button>\n' +
        '            </form>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="col-md-6 col-sm-12">\n' +
        '    <div class="login-form loginContainer">\n' +
        '        <p class="paragraph-fav-best">New user? Register now!</p>\n' +
        '        <form>\n' +
        '            <div class="form-group">\n' +
        '                <label>First Name</label>\n' +
        '                <input type="text" class="form-control" id="firstname" placeholder="First Name">\n' +
        '            </div>\n' +
        '            <div class="form-group">\n' +
        '                <label>Last Name</label>\n' +
        '                <input type="text" class="form-control" id="lastname" placeholder="Last Name">\n' +
        '            </div>\n' +
        '            <div class="form-group">\n' +
        '                <label>E-mail</label>\n' +
        '                <input type="text" class="form-control" id="email" placeholder="E-mail">\n' +
        '            </div>\n' +
        '            <div class="form-group">\n' +
        '                <label>Username</label>\n' +
        '                <input type="text" class="form-control" id="usernameReg" placeholder="Username">\n' +
        '            </div>\n' +
        '            <div class="form-group">\n' +
        '                <label>Password</label>\n' +
        '                <input type="password" class="form-control" id="passwordReg" placeholder="Password">\n' +
        '            </div>\n' +
        //'            <button type="button" class="btn btn-black" id="registerButton">Register</button>\n' +
        '        </form>\n' +
        '    </div>\n' +
        '</div>\n'
    $("#user").html(s);
}