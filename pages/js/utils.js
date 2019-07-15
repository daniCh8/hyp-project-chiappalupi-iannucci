"use strict";

function notifyerror(message) {
    var s = '<div class=" message alert alert-danger alert-dismissible fade show" role="alert" id="erroralert">' + message + ' ' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
        '    <span aria-hidden="true">&times;</span>\n' +
        '  </button>' +
        '</div';
    var $alertdiv = $('<div></div>');
    $alertdiv.html(s);
    $('body').append($alertdiv);
}

function notifyinfo(message) {
    var s = '<div class=" message alert alert-info alert-dismissible fade show" role="alert" id="infoalert">' + message + ' ' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
        '    <span aria-hidden="true">&times;</span>\n' +
        '  </button>' +
        '</div';
    var $alertdiv = $('<div></div>');
    $alertdiv.html(s);
    $('body').append($alertdiv);
}

function addToCart(ISBN, qnt) {

    isUserLoggedIn(function(loggato) {
        if (loggato) {
            canAddToCart(ISBN, qnt);
            notifyinfo("book successfully added to cart!");
        } else {
            window.location.replace("myaccount.html");
        }
    });
}




function isUserLoggedIn(callBack) {
    jQuery.ajax({
        url: 'https://hyp-2019-chiappalupi-iannucci.herokuapp.com/user',
        type: 'GET',
        dataType: 'json',
        credentials: 'same-origin',
        origin: "https://hyp-2019-chiappalupi-iannucci.herokuapp.com",
        crossDomain: true,
        success: () => {
            console.log('ajax success');
            callBack(true);
        },
        error: () => {
            callBack(false);
        }
    });
}

function canAddToCart(ISBN, qnt) {

    var s = "https://hyp-2019-chiappalupi-iannucci.herokuapp.com/cart?ISBN="+ISBN+"&quantity="+qnt;

    jQuery.ajax({
        url: s,
        origin: "https://hyp-2019-chiappalupi-iannucci.herokuapp.com",
        crossDomain: true,
        type: 'POST',
        dataType: 'json',

        credentials: 'same-origin',

        xhrFields: {
            withCredentials: true
        },
        success: () => {

            console.log('ajax success');

        },
        error: ()=>{

        }
    });
}