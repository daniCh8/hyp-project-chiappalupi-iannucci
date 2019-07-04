"use strict";

// This function takes an array of books as input and returns the HTML necessary to display them.
function drawBook(data) {
    var s = '';
    for (var i = 0; i < data.length; i++) {
        s = s + '<div class="col-md-6 elementPictureContainer"> '
        s = s + '<div class="elementPicture">\n' +
            '    <img src="' + data[i].pictureURL + '" alt="' + data[i].name + '">\n' +
            '</div>'+
            '</div>'+
            '    <div class="col-md-6 elementDescriptionContainer"> ' +
            '    <div class="elementDescription">' +
            '    <p class="topic-section"> <strong>Title: </strong>' + data[i].name +'</p>';
        for(var j = 0; j <data[i].authors.length; j++) {
            s = s + '    <p class="topic-section"> <strong>Authors: </strong> <a  href="author.html?name=' + data[i].authors[j] + '">' + data[i].authors[j] + '</a></p>';
        }
            s = s + '    <p class="topic-section"> <strong>Plot: </strong>' + data[i].plot +'</p>' +
            '    <p class="topic-section"> <strong>Price: </strong>' + data[i].price +'</p>' +
                '<button onclick="addToCart("' + data[i].ISBN + ', 1");" style="background-color: rgba(68,54,39,0.1); width:-webkit-fill-available;"> <div class="container" style="display: flex; flex-direction: column; "> <img src="svg/mbri-cart-add.svg" alt="">  <p> Add to cart </p> </div> </button>' +
            '</div></div>';
        s = s + '<div class = container" id="eventsshelf"> </div>';

           var filter = {};
           filter.ISBN = data[i].ISBN;
           fetchEvent(filter);
    }

    return s;
}

// This function retrieves books from the server and builds the UI accordingly
function fetchBook(filter) {
        // Use the filter endpoint
        jQuery.ajax({
            url: "https://hyp-2019-chiappalupi-iannucci.herokuapp.com/book/findBooksBy",
            type: 'GET',
            data: filter,
            dataType: 'json',
            success: (data) => {
                console.log('ajax success');
                var s = drawBook(data);
                $('#bookshelf').html(s);
            },
            error: ()=>{
                notifyerror("qualcosa è andato storto");
            }
        });
}

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

    fetchBook(filter);
});



function drawEvents(data) {
    var date = '';
    var dateData = '';
    var time = '';
    var s = '';


    for (var i = 0; i < data.length; i++) {
        if (i==0) s = s + '<p class="paragraph-fav-best">  <em> There is an event planned for the presentation of this book! </em></p>\n';
        if(i>0) s = s + '<p class="paragraph-fav-best">  <em> There is another event planned for the presentation of this book! </em></p>\n';

        s = s + '<div class="content">\n' +
            '    <div class="grid fadeIn">\n';
        s = s + '<figure class="effect-julia figureevents">\n' +
            '            <a href="event.html?' + data[i].eventID + '">\n' +
            '            <img src="' + data[i].pictureURL + '"/>\n' +
            '            <figcaption class="figCaptionEvents">\n' +
            '                <h2>' + data[i].shop + '</h2>\n' +
            '                <div>\n' +
            '                    <p>' + data[i].address + '</p>\n' +
            '                    <p>' + data[i].city + '</p>\n';
        dateData = data[i].date;
        date = dateData.substr(0,10);
        time = dateData.substr(11,5);
        s = s + '                    <p>'+ date + '</p>\n' +
            '                    <p>'+ time + '</p>\n' +
            '                </div>\n' +
            '            </figcaption>\n' +
            '        </figure>' +
            '        </a>\n';


    }

    s = s + '</div>\n' +
    '    </div>';

    return s;
}

function fetchEvent(filter) {
    jQuery.ajax({
        url: 'https://hyp-2019-chiappalupi-iannucci.herokuapp.com/event/findByISBN',
        type: 'GET',
        data: filter,
        dataType: 'json',

        success: (data) => {
            console.log('ajax success');
            var s = drawEvents(data);
            $('#eventsshelf').html(s);
        },
        error: ()=>{
            notifyerror("qualcosa è andato storto");
        }
    });
}