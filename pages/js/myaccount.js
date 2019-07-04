$(document).ready(() => {

    isUserLoggedIn(function(loggato) {
        if (loggato) {
            fetchAccount();
        } else {
            drawLoginForm();
        }
    });

});


function isUserLoggedIn(callBack) {
    jQuery.ajax({
        url: 'http://hyp-2019-chiappalupi-iannucci.herokuapp.com/user',
        type: 'GET',
        dataType: 'json',
        credentials: 'same-origin',
        Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
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
        url: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com/user/login",
        Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
        type: 'POST',
        dataType: 'json',
        data: credential,
        xhrFields: {
            withCredentials: true
        },
        success: () => {
            $("#loginButton").removeClass("disabled");
            console.log('ajax success');
                window.location.replace("myaccount.html");

        },
        error: (result)=>{
            $("#loginButton").removeClass("disabled");
            notifyerror(result.responseJSON.errorMessage);
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
        error: (result)=>{
            $("#logoutButton").removeClass("disabled");
            notifyerror(result.responseJSON.erroMessage);
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
        success: () => {
            $("#registerButton").removeClass("disabled");
            console.log('ajax success');
                window.location.replace("myaccount.html" );
        },
        error: (result)=>{
            $("#registerButton").removeClass("disabled");
            notifyerror(result.responseJSON.errorMessage);
        }
    });
}

function goToCart() {
    window.location.replace("cart.html");
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
            notifyerror(result.responseJSON.errorMessage);
        }
    });
}

function drawAccount(data) {
    var s = '';
    s = s + '<div class="login-html fadeInDown">\n' +
        '            <p class="title-fav-best-white" > Hi ' + data[0].firstName + ', <br>Here you may find some information about your account.</p>\n' +
        '            <p class="paragraph-fav-best-white"> <strong>Name:  </strong>' + data[0].firstName + ' ' + data[0].lastName + '</p>\n' +
        '            <p class="paragraph-fav-best-white">    <strong>Username:  </strong>' + data[0].username + '</p>\n' +
        '            <p class="paragraph-fav-best-white">    <strong>E-mail:  </strong>' + data[0].email + '</p>\n' +
        '        <button  onclick="goToCart();" style=" width:-webkit-fill-available;"> <div class="container" style="display: flex; flex-direction: column; "> <img src="svg/mbri-cart-add.svg" alt="">  <p> Take a look at your cart! </p> </div> </button>' +
        '<button style=" width:-webkit-fill-available; "onclick="logout();"> <div class="container" style="display: flex; flex-direction: column; "> <img src="svg/mbri-logout.svg" alt="">  <p> Logout </p> </div> </button>' +
    '</div>';
    $("#user").html(s);
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

