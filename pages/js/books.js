"use strict";

// This function takes an array of books as input and returns the HTML necessary to display them.
function drawBooks(data, int) {
    var s = '';
    for (var i = 0; i < data.length; i++) {
        if(int==1){
            s = s + '<div class = "bookcontainer1">';
        }
        if(int==2){
            s = s + '<div class = "bookcontainer2">';
        }
        if(int==3){
            s = s + '<div class = "bookcontainer3">';
        }
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
        for(var j = 0; j <data[i].authors.length; j++) {
            s = s + '<p>' + data[i].authors[j] + '</p>'

        }
        s = s +
            '<p style="margin-top: 10px"><i>' + data[i].theme + '</i></p>' +
            '<p style="margin-bottom: 5px"><i>' + data[i].genre + '</i></p>'+
            '<p><i>' + data[i].price + '</i></p>'+
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

        if(int==1) {
            s = s + '<button onclick="addToCart('+data[i].ISBN +', 1);" style="background-color: rgba(68,54,39,0.1);"> <div class="container" style="display: flex; flex-direction: column;"> <img src="svg/mbri-cart-add.svg" alt="">  <p> Add to cart </p> </div> </button>'
        }
        if(int==2){
            s = s + '<button onclick="addToCart('+data[i].ISBN +', 1);" style="background-color: rgba(179,166,187,0.4);"> <div class="container" style="display: flex; flex-direction: column;"> <img src="svg/mbri-cart-add.svg" alt="">  <p> Add to cart </p> </div> </button>'
        }
        if(int==3){
            s = s + '<button onclick="addToCart('+data[i].ISBN +', 1);" style="background-color: rgba(115,130,144,0.4);"> <div class="container" style="display: flex; flex-direction: column;"> <img src="svg/mbri-cart-add.svg" alt="">  <p> Add to cart </p> </div> </button>'
        }
        s = s + "</div>";
    }

    return s;
}

// This function retrieves books from the server and builds the UI accordingly
function fetchBooks(filter) {
    // Filter parameter is optional
    if (filter){
        // Use the filter endpoint
        jQuery.ajax({
            url: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com/book/findBooksBy",
            type: 'GET',
            data: filter,
            dataType: 'json',
            Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
            success: (data) => {
                console.log('ajax success');
                var s = drawBooks(data, 1);
                $('#bookshelf').html(s);
            },
            error: ()=>{
                notifyerror("qualcosa è andato storto");
            }
        });

    } else {
        // If no filter was specified, let's get them all!
        jQuery.ajax({
            url: 'http://hyp-2019-chiappalupi-iannucci.herokuapp.com/book',
            type: 'GET',
            dataType: 'json',
            Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
            success: (data) => {
                console.log('ajax success');
                var s = drawBooks(data, 1);
                $('#bookshelf').html(s);
            },
            error: ()=>{
                notifyerror("qualcosa è andato storto");
            }
        });
    }
}

function searchClick(){
        var filter = {};
        var genres = $("#bookgenre").val();
        if (genres !== "") {
            filter.genres=genres;
        }
        var themes = $("#booktheme").val();
        if (themes !== "") {
            filter.themes=themes;
        }
        var name = $("#booktitle").val();
        if (name !== "") {
        filter.name=name;
        }
        var author = $("#authorname").val();
        if (author !== "") {
            filter.author=author;
        }


        fetchBooks(filter);
}

function searchClickNavbar(){
    var filter = {};

    var name = $("#booktitleNavbar").val();
    if (name !== "") {
        filter.name=name;
    }
    var author = $("#authornameNavbar").val();
    if (author !== "") {
        filter.author=author;
    }


    fetchBooks(filter);
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
    $("#searchbutton").click(searchClick);
    $("#searchbuttonSmall").click(searchClick);
    $("#searchbuttonNavbarSmall").click(searchClickNavbar);

    // As soon as the page loads, load all the books
    fetchBooks(filter);
    favouriteReading();
    bestsellers();

});

function favouriteReading(){
    jQuery.ajax({
        url: 'http://hyp-2019-chiappalupi-iannucci.herokuapp.com/book/getBestsellers',
        type: 'GET',
        dataType: 'json',
        Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
        success: (data) => {
            console.log('ajax success');
            var s = drawBooks(data, 2);
            $('#bookshelfFav').html(s);
        },
        error: ()=>{
            notifyerror("qualcosa è andato storto");
        }
    });
}

function bestsellers(){
    jQuery.ajax({
        url: 'http://hyp-2019-chiappalupi-iannucci.herokuapp.com/book/getFavouriteBooks',
        type: 'GET',
        dataType: 'json',
        Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
        success: (data) => {
            console.log('ajax success');
            var s = drawBooks(data, 3);
            $('#bookshelfBest').html(s);
        },
        error: ()=>{
            notifyerror("qualcosa è andato storto");
        }
    });
}

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

    var s = "http://hyp-2019-chiappalupi-iannucci.herokuapp.com/cart?ISBN="+ISBN+"&quantity="+qnt;

    jQuery.ajax({
        url: s,
        Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
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