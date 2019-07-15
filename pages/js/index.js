"use strict";

// This function takes an array of books as input and returns the HTML necessary to display them.
function drawBooks(data, int) {
    var s = '';
    for (var i = 0; i < 3; i++) {
        if (int == 1) {
            s = s + '<div class = "bookcontainer1">';
        }
        if (int == 2) {
            s = s + '<div class = "bookcontainer2">';
        }
        if (int == 3) {
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
            '<img src="' + data[i].pictureURL + '" style="height:220px;">' +
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

        if (int == 1) {
            s = s + '<button onclick="addToCart('+data[i].ISBN +', 1);" style="background-color: rgba(68,54,39,0.1);"> <div class="container" style="display: flex; flex-direction: column;"> <img src="svg/mbri-cart-add.svg" alt="">  <p> Add to cart </p> </div> </button>'
        }
        if (int == 2) {
            s = s + '<button onclick="addToCart('+data[i].ISBN +', 1);" style="background-color: rgba(179,166,187,0.4);"> <div class="container" style="display: flex; flex-direction: column;"> <img src="svg/mbri-cart-add.svg" alt="">  <p> Add to cart </p> </div> </button>'
        }
        if (int == 3) {
            s = s + '<button onclick="addToCart('+data[i].ISBN +', 1);" style="background-color: rgba(115,130,144,0.4);"> <div class="container" style="display: flex; flex-direction: column;"> <img src="svg/mbri-cart-add.svg" alt="">  <p> Add to cart </p> </div> </button>'
        }
        s = s + "</div>";
    }

    return s;
}




$(document).ready(() => {

    favouriteReading();
    bestsellers();

});

function favouriteReading() {
    jQuery.ajax({
        url: 'https://hyp-2019-chiappalupi-iannucci.herokuapp.com/book/getBestsellers',
        type: 'GET',
        dataType: 'json',
        Origin: "https://hyp-2019-chiappalupi-iannucci.herokuapp.com",
        success: (data) => {
            console.log('ajax success');
            var s = drawBooks(data, 2);
            $('#bookshelfFav').html(s);
        },
        error: () => {
            notifyerror("qualcosa è andato storto");
        }
    });
}

function bestsellers() {
    jQuery.ajax({
        url: 'https://hyp-2019-chiappalupi-iannucci.herokuapp.com/book/getFavouriteBooks',
        type: 'GET',
        dataType: 'json',
        Origin: "https://hyp-2019-chiappalupi-iannucci.herokuapp.com",
        success: (data) => {
            console.log('ajax success');
            var s = drawBooks(data, 3);
            $('#bookshelfBest').html(s);
        },
        error: () => {
            notifyerror("qualcosa è andato storto");
        }
    });
}

