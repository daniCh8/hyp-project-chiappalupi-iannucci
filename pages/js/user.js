

function isUserLogged(callBack) {
    jQuery.ajax({
        url: "https://hyp-2019-chiappalupi-iannucci.herokuapp.com/cart",
        Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
        type: 'GET',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: (result) => {
            $("#loginButton").removeClass("disabled");
            console.log('ajax success');
           callBack(result.success);
        },
        error: ()=>{
            return callBack(false);
        }
    });
}

function getCartItems() {
    // Controllo se l'utente è loggato
    isUserLoggedIn(function(loggato) {
        if (loggato) {
            alert("L'utente è loggato!");
        } else {
            alert("L'utente NON è loggato!");
        }
    });
    
}

function addToCart(isbn, qnt) {
    
}

