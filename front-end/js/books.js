"use strict";


$(document).ready(() => {

    jQuery.ajax({
        url: 'https://hyp-2019-chiappalupi-iannucci.herokuapp.com/book',
        //TODO: parametrize url
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            console.log('ajax success');
            var s = 'All books:';
            for (var i = 0; i < data.length; i++) {
                s = s + '<div class = "bookcontainer">';
                s = s + '<br />Name: ' + data[i].name + 'ISBN: ' + data[i].ISBN + 'Theme: ' + data[i].theme + 'Genre ' + data[i].genre
                s = s + "</div>";
            }
            $('#bookshelf').html(s);
        },
        error: ()=>{
            $('.alert').alert();
        }
    });
});