"use strict";

function notifyerror(message) {
    var s = '<div class="alert alert-danger alert-dismissible fade show" role="alert" id="erroralert">' + message + ' ' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
        '    <span aria-hidden="true">&times;</span>\n' +
        '  </button>' +
        '</div';
    var $alertdiv = $('<div></div>');
    $alertdiv.html(s);
    $('body').append($alertdiv);
}

