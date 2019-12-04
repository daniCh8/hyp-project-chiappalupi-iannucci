function getFriend() {
    // Controllo se l'utente è loggato
    isUserLoggedIn(function(loggato) {
        if (loggato) {
            fetchFriend();
        } else {
            window.location.replace("signinss.html");
        }
    });

}

$(document).ready(() => {
    $("#searchbutton").click(getFriend());
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

function fetchFriend() {
    jQuery.ajax({
        url: "https://hyp-2019-chiappalupi-iannucci.herokuapp.com/ssanta/target",
        type: 'GET',
        dataType: 'json',
        credentials: 'same-origin',
        success: (data) => {
            console.log('ajax success');
            drawFriend(data);
        },
        error: (result)=>{
            notifyerror(result.responseJSON.errorMessage);
        }
    });
}

function drawFriend(data) {
    var s = '';
    s = s + '<div class="login-html fadeInDown">\n' +
        '            <p class="title-fav-best-white" > Hi ' + data[0].firstName + ', <br>Here you may find some information about your account.</p>\n' +
        '            <p class="paragraph-fav-best-white"> <strong>Name:  </strong>' + data[0].firstName + ' ' + data[0].lastName + '</p>\n' +
        '            <p class="paragraph-fav-best-white">    <strong>Username:  </strong>' + data[0].username + '</p>\n' +
        '            <p class="paragraph-fav-best-white">    <strong>E-mail:  </strong>' + data[0].email + '</p>\n' +
        '        <button  onclick="goToCart();" style=" width:-webkit-fill-available;"> <div class="container" style="display: flex; flex-direction: column; "> <img src="svg/mbri-cart-add.svg" alt="">  <p> Take a look at your cart! </p> </div> </button>' +
        '<button style=" width:-webkit-fill-available; "onclick="logout();"> <div class="container" style="display: flex; flex-direction: column; "> <img src="svg/mbri-logout.svg" alt="">  <p> Logout </p> </div> </button>' +
        '</div>';
    $("#friend").html(s);
}