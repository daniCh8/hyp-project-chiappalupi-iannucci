"use strict";

function notifyerror(message) {
    var s = '<div class="alert alert-danger" role="alert" id="erroralert">' + message + '</div';
    var $alertdiv = $('<div></div>');
    $alertdiv.html(s);
    $('body').append($alertdiv);
}