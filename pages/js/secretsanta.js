function getFriend() {
    // Controllo se l'utente è loggato
    isUserLoggedIn(function(loggato) {
        if (loggato) {
            window.location.replace("friendpage.html");
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
