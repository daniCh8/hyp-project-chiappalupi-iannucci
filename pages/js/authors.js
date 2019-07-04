"use strict";

$(document).ready(() => {

    var filter = {};

    //Checking if the client has specified any filter parameter
    try {
        var querystring = location.search;
        var subquerystring = querystring.substr(1);
        var keyvalyepairs = subquerystring.split('&');
        $.each(keyvalyepairs, function(i, kv){
            var key = kv.split('=')[0];
            var value = kv.split('=')[1];
            value = value.replace(/%20/g, ' ');
            console.log(value);
            filter[key]=value;
        });
    } catch{
        //TODO:
    }
    console.log(filter);
    fetchAuthors(filter);
});

/*
function drawAuthors(data) {
    var s = '';
    for (var i = 0; i < data.length; i++) {
        s = s +
            '        <figure class="effect-winston figureauthors">\n' +
            '            <a href="bestsellers.html" id="genre1">\n' +
            '            <img src="' + data[i].pictureURL + '" alt="img30"/>\n' +
            '            <figcaption>\n' +
            '                <h2>' + data[i].name + '</h2>\n' +
            '            </figcaption>\n' +
            '        </figure>\n' +
            '        </a>\n';
    }
    return s;
}*/



function drawAuthors(data) {
    var $authorsdiv = $('#authorsshelf');

    for (var i = 0; i < data.length; i++) {
        var author = data[i];

        var $figure = $("<figure/>");
        $figure.addClass("effect-winston");
        $figure.addClass("figureauthors");
        var $a = $("<a/>");
        var s = 'author.html?name=' + author.name;
        $a.attr("href", s)
        //$a.click(author, drawAuthorModal);
        var $img = $("<img/>");
        $img.attr("src", data[i].pictureURL);
        $img.attr("alt", data[i].name);
        var $figcaption = $("<figcaption />");
        var $h2 = $("<h2/>");
        $h2.text(data[i].name);

        $figcaption.append($h2);
        $a.append($figure);
        $figure.append($img);
        $figure.append($figcaption);
        $authorsdiv.append($a);

    }
}

function fetchAuthors(filter) {

    // Filter parameter is optional
    if (filter) {
        // Use the filter endpoint
        jQuery.ajax({
            url: "https://hyp-2019-chiappalupi-iannucci.herokuapp.com/author/findByName",
            type: 'GET',
            data: filter,
            dataType: 'json',
            success: (data) => {
                console.log('ajax success');
                drawAuthors(data);
            },
            error: () => {
                notifyerror("qualcosa è andato storto");
            }
        });

    } else {
        // If no filter was specified, let's get them all!
        jQuery.ajax({
            url: 'https://hyp-2019-chiappalupi-iannucci.herokuapp.com/author',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                console.log('ajax success');
                drawAuthors(data);
            },
            error: () => {
                notifyerror("qualcosa è andato storto");
            }
        });
    }
}
