"use strict";

function drawAuthor(data) {
    var s = '';
    for (var i = 0; i < data.length; i++) {
        s = s + '<div class="elementPictureContainer"> '+
            '    <img src="' + data[i].pictureURL + '" alt="' + data[i].name + '">\n' +
            '</div>'+
            '    <div class="col-md-6 elementDescriptionContainer"> ' +
            '    <div class="elementDescription">' +
            '    <p class="topic-section"> <strong>Name: </strong>' + data[i].name +'</p>'+
        '    <p class="topic-section"> <strong>Biography: </strong>' + data[i].bio +'</p>'+
            '</div></div>'
        var filter = {};
        filter.author = data[i].name;
        fetchBooks(s, filter, data[i].name);
    }
}

function appendBooks(data, author) {
    var s = '';
    if(data.length==1){
        s = s + '<div class = container">'+
            ' <p class="paragraph-fav-best">  <em> Check out this book written by ' + author +  ':</em></p>\n';
    }
    if(data.length>1){
        s = s + '<div class = container">'+
            ' <p class="paragraph-fav-best">  <em> Check out these books written by ' + author +  ':</em></p>\n';
    }
    s = s + '<div class = "col-md-12 bookscontainerauthor fadeIn">'
    for (var i = 0; i < data.length; i++) {
        s = s + '<div class = "bookcontainer1">';
        s = s + '<a class="booklink" href="book.html?name=' + data[i].name + '"> <div class="component">\n' +
            '    <ul class="align">\n' +
            '        <li>\n' +
            '            <figure class=\'book fadeInDown\' >\n' +
            '\n' +
            '                <!-- Front -->\n' +
            '\n' +
            '                <ul class=\'hardcover_front\'>\n' +
            '                    <li>\n' +
            '                        <div class="coverDesign">\n' +
            '                            \n' +
            '<img src="' + data[i].pictureURL + '" style="width:160px ;height:220px;">' +
            '                        </div>\n' +
            '                    </li>\n' +
            '                    <li></li>\n' +
            '                </ul>\n' +
            '\n' +
            '                <!-- Pages -->\n' +
            '\n' +
            '                <ul class=\'page\'>\n' +
            '                    <li></li>\n' +
            '                    <li style="align-content: center">\n' +
            '<div class="container" style="padding: 0px; height: -webkit-fill-available; display: flex; justify-content:center; align-content:center;flex-direction:column;"> ' +
            '<p style="margin-bottom: 2px"><b>' + data[i].name + '</b></p>';
        for (var j = 0; j < data[i].authors.length; j++) {
            s = s + '<p>' + data[i].authors[j] + '</p>'

        }
        s = s +
            '<p style="margin-top: 10px"><i>' + data[i].theme + '</i></p>' +
            '<p><i>' + data[i].genre + '</i></p>' +
            '                    </div></li>\n' +
            '                    <li></li>\n' +
            '                    <li></li>\n' +
            '                    <li></li>\n' +
            '                </ul>\n' +
            '\n' +
            '                <!-- Back -->\n' +
            '\n' +
            '                <ul class=\'hardcover_back\'>\n' +
            '                    <li></li>\n' +
            '                    <li></li>\n' +
            '                </ul>\n' +
            '                <ul class=\'book_spine\'>\n' +
            '                    <li></li>\n' +
            '                    <li></li>\n' +
            '                </ul>\n' +

            '            </figure>\n' +
            '        </li>\n' +
            '    </ul>\n' +
            '</a></div>';
        s = s + '<button onclick="addToCart('+data[i].ISBN +', 1);" style="background-color: rgba(68,54,39,0.1);"> <div class="container" style="display: flex; flex-direction: column;"> <img src="svg/mbri-cart-add.svg" alt="">  <p> Add to cart </p> </div> </button>'+
            '</div>';
    }
    s = s +'</div>';
        return s;

}

function fetchBooks(st, filter, author) {
    jQuery.ajax({
        url: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com/book/findBooksBy",
        type: 'GET',
        data: filter,
        dataType: 'json',
        Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
        success: (data) => {
            console.log('ajax success');
            var s = st + appendBooks(data, author);
            $('#authorshelf').html(s);
        },
        error: ()=>{
            notifyerror("qualcosa è andato storto");
        }
    });
}


function fetchAuthor(filter) {
    // Filter parameter is optional
    if (filter) {
        // Use the filter endpoint
        jQuery.ajax({
            url: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com/author/findByName",
            type: 'GET',
            data: filter,
            dataType: 'json',
            Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
            success: (data) => {
                console.log('ajax success');
                drawAuthor(data);
            },
            error: () => {
                notifyerror("qualcosa è andato storto");
            }
        });
    }
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
    }
    console.log(filter);

    fetchAuthor(filter);
});




function addToCart(ISBN, qnt) {

    isUserLoggedIn(function(loggato) {
        if (loggato) {
            canAddToCart(ISBN, qnt);
        } else {
            window.location.replace("myaccount.html");
        }
    });
}




function isUserLoggedIn(callBack) {
    jQuery.ajax({
        url: 'http://hyp-2019-chiappalupi-iannucci.herokuapp.com/user',
        type: 'GET',
        dataType: 'json',
        credentials: 'same-origin',
        Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
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
    var s = '';
    s = s + ISBN;
    var item = {
        "ISBN": ISBN,
        "quantity": qnt
    };
    jQuery.ajax({
        url: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com/cart",
        Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
        type: 'POST',
        dataType: 'json',
        data: item,
        xhrFields: {
            withCredentials: true
        },
        success: () => {

            console.log('ajax success');

        },
        error: (result)=>{
            notifyerror(result.responseJSON.errorMessage);
        }
    });
}