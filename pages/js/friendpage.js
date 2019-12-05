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
    s = s +
        '            <p class="title-fav-best-white" > Hi ' + data.myself + ', <br>Here is your target.</p>\n'  +
        '<p class="title-fav-best-white" > ' + data.targetName + '</p>\n'   +
        '<img src="' + data.targetPicURL + '" style="height: 300px"></img>\n'   +
        '</div>';
    $("#friend").html(s);
}