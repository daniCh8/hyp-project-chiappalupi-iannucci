"use strict";

// This function takes an array of books as input and returns the HTML necessary to display them.
function drawEvent(data) {
    var s = '';
    var date = '';
    var dateData = '';
    var time = '';
    for (var i = 0; i < data.length; i++) {
        dateData = data[i].date;
        date = dateData.substr(0,10);
        time = dateData.substr(11,5);
        s = s + '    <p class="paragraph-fav-best" id="join"></p>\n';
        fetchBook(data[i].ISBN);
        s = s + '    <p class="paragraph-fav-best"> <strong>When: </strong>' +
            date + ' at ' + time;
        s = s + '</p>\n' +
            '    <p class="paragraph-fav-best"> <strong>Where: </strong>' +
            data[i].address + ', ' + data[i].city;
        s = s  + '</p>\n' +
            '<div class="col-md-12 elementContainer fadeIn">\n' +
            '    <div  id="bookcontainer"></div>\n';
        fetchBook(data[i].ISBN, 1);
        s = s +  '    <div  class="grid fadeIn" id="authorcontainer"></div>\n';
        fetchBookAuthor(data[i].ISBN);
        s = s +    '</div>\n'
    }

    return s;
}

// This function retrieves books from the server and builds the UI accordingly
function fetchEvent(value) {
     var s =  "https://hyp-2019-chiappalupi-iannucci.herokuapp.com/event/" + value;
    // Use the filter endpoint
    jQuery.ajax({
        url: s,
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            console.log('ajax success');
            var s = drawEvent(data);
            $('#eventshelf').html(s);
        },
        error: ()=>{
            notifyerror("qualcosa è andato storto");
        }
    });
}

function fetchAuthor(name) {
    var s =  "https://hyp-2019-chiappalupi-iannucci.herokuapp.com/author/findByName?name=" + name ;
    // Use the filter endpoint
    jQuery.ajax({
        url: s,
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            console.log('ajax success');
            drawAuthor(data);
        },
        error: ()=>{
            notifyerror("qualcosa è andato storto");
        }
    });
}

function fetchBookAuthor(ISBN) {
        var s = "https://hyp-2019-chiappalupi-iannucci.herokuapp.com/book/" + ISBN;
    var author = '';
        // Use the filter endpoint
        jQuery.ajax({
            url: s,
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                console.log('ajax success');
                fetchAuthor(data[0].authors[0]);
            },
            error: () => {
                notifyerror("qualcosa è andato storto");
            }
        });
}

function fetchBook(ISBN, i) {
    if(!i) {
        var s = "https://hyp-2019-chiappalupi-iannucci.herokuapp.com/book/" + ISBN;
        var r = "Join the launch of ";
        // Use the filter endpoint
        jQuery.ajax({
            url: s,
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                console.log('ajax success');
                r = r + data[0].name;
                $('#join').html(r);
            },
            error: () => {
                notifyerror("qualcosa è andato storto");
            }
        });
    }
    if(i) {
        var s = "https://hyp-2019-chiappalupi-iannucci.herokuapp.com/book/" + ISBN;
        var r = '';
        // Use the filter endpoint
        jQuery.ajax({
            url: s,
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                console.log('ajax success');
                r = r + drawBook(data,i);
                $('#bookcontainer').html(r);
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
        var value = querystring.substr(1);
    } catch{
        //TODO:
    }
    console.log(filter);

    fetchEvent(value);
});



function drawBook(data, int) {
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
            '<p><i>' + data[i].genre + '</i></p>'+
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
            s = s + '<button style="background-color: rgba(68,54,39,0.1);"> <div class="container" style="display: flex; flex-direction: column;"> <img src="svg/mbri-cart-add.svg" alt="">  <p> Add to cart </p> </div> </button>'
        }
        if(int==2){
            s = s + '<button style="background-color: rgba(179,166,187,0.4);"> <div class="container" style="display: flex; flex-direction: column;"> <img src="svg/mbri-cart-add.svg" alt="">  <p> Add to cart </p> </div> </button>'
        }
        if(int==3){
            s = s + '<button style="background-color: rgba(115,130,144,0.4);"> <div class="container" style="display: flex; flex-direction: column;"> <img src="svg/mbri-cart-add.svg" alt="">  <p> Add to cart </p> </div> </button>'
        }
        s = s + "</div>";
    }

    return s;
}

function drawAuthor(data) {
    var $authorsdiv = $('#authorcontainer');

    for (var i = 0; i < data.length; i++) {

        var $figure = $("<figure/>");
        $figure.addClass("effect-winston");
        $figure.addClass("figureauthors");
        $figure.addClass("authorContainerVar");
        var $a = $("<a/>");
        var s = 'author.html?name=' + data[i].name;
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