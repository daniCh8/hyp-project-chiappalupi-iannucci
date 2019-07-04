"use strict";


// This function retrieves items in the cart from the server and builds the UI accordingly
function fetchItems() {
    jQuery.ajax({
        url: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com/cart",
        type: 'GET',
        dataType: 'json',
        Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
        success: (data) => {
            console.log('ajax success');
            drawItems(data);
        },
        error: ()=>{
            notifyerror("qualcosa è andato storto");
        }
    });
}


$(document).ready(() => {

    isUserLoggedIn(function(loggato) {
        if (loggato) {
            fetchItems();
        } else {
            window.location.replace("myaccount.html");
        }
    });

});

function addToCart() {

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



function fetchBooks(prevData) {
    var quantity=0;
    for(var i = 0; i < prevData.length; i++){
        var s = "http://hyp-2019-chiappalupi-iannucci.herokuapp.com/book/" + prevData[i].ISBN;
        quantity = prevData[i].quantity;
        // Use the filter endpoint
        jQuery.ajax({
            url: s,
            type: 'GET',
            dataType: 'json',
            Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
            success: (data) => {
                console.log('ajax success');
                drawBook(data);
            },
            error: () => {
                notifyerror("qualcosa è andato storto");
            }
        });
    }
}


function drawBook(data) {
    var s = '';
            s = s + '<div class = "bookcontainer1">';
        s = s + '<a class="booklink" href="book.html?name=' + data[0].name + '"> <div class="component">\n' +
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
            '<img src="' + data[0].pictureURL + '" style="width:160px ;height:220px;">' +
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
            '<p style="margin-bottom: 2px"><b>' + data[0].name + '</b></p>';
        for(var j = 0; j <data[0].authors.length; j++) {
            s = s + '<p>' + data[0].authors[j] + '</p>'

        }
        s = s +
            '<p style="margin-top: 10px"><i>' + data[0].theme + '</i></p>' +
            '<p><i>' + data[0].genre + '</i></p>'+
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
        s = s + "</div>";
var ISBN = data[0].ISBN;
    $('#' + ISBN ).html(s);

}

function drawQuantity(data) {
    if (data.length < 1) {
        var s = '<div class="container"> <p class="title-fav-best"> <em>Your cart is empty</em> </p> ' +
            '<a class="paragraph-fav-best" href="books.html">Start shopping now!</a>' +
            '</div>';
        $('#itemsshelf').html(s);
    } else {
        var r = '<div class="container backTo">\n' +
            '    <a class="topic-section" href="myaccount.html"> <img src="svg/mbri-arrow-prev.svg" alt="leftarrow">  My account\n' +
            '    </a>\n' +
            '</div>\n' +
            '\n' +
            '<div class="container">';
        $('#itemsshelf').html(r);
        for (var i = 0; i < data.length; i++) {
            var s = '<div class = "container col-12 elementContainer fadeIn">' +
                '<div class="container col-6" id="' + data[i].ISBN + '"></div> ' +
                '<div class="container col-6"> <div class="bookcontainer1"> <p class="paragraph-fav-best">Quantity:' + data[i].quantity + '</p></div>' +
                '</div>' +
                '</div>';
            $('#itemsshelf').append(s);
        }
        var t = '</div>';
        $('#itemsshelf').append(t);

        fetchBook(data);
    }
}

function drawItems(data) {
    if(data.length<1){
        var s = '<div class="container"> <p class="title-fav-best"> <em>Your cart is empty</em> </p> ' +
            '<a class="paragraph-fav-best" href="books.html">Start shopping now!</a>' +
            '</div>';
        $('#itemsshelf').html(s);
    }
    else {
        var r = '<div class="container mb-4">\n' +
            '    <div class="row">\n' +
            '        <div class="col-12">\n' +
            '            <div class="table-responsive">\n' +
            '                <table class="table table-striped">\n' +
            '                    <thead>\n' +
            '                    <tr>\n' +
            '                        <th scope="col"> </th>\n' +
            '                        <th scope="col">Product</th>\n' +
            '                        <th scope="col" class="text-center">Quantity</th>\n' +
            '                        <th scope="col" class="text-right">Price</th>\n' +
            '                        <th> </th>\n' +
            '                    </tr>\n' +
            '                    </thead>\n' +
            '                    <tbody>\n' +
            '                    <tr id="tableValues">';
        r = r + '                    </tr>\n' +
            '                    <tr>\n' +
            '                        <td></td>\n' +
            '                        <td></td>\n' +
            '                        <td></td>\n' +
            '                        <td><strong>Total</strong></td>\n' +
            '                        <td class="text-right"><strong>346,90 €</strong></td>\n' +
            '                    </tr>\n' +
            '                    </tbody>\n' +
            '                </table>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="col mb-2">\n' +
            '            <div class="row">\n' +
            '                <div class="col-sm-12  col-md-6">\n' +
            '                    <button class="btn btn-block " style="background-color: rgba(68,54,39, 0.1); margin: 10px;">Continue Shopping</button>\n' +
            '                </div>\n' +
            '                <div class="col-sm-12 col-md-6 text-right">\n' +
            '                    <button class="btn btn-lg btn-block  text-uppercase" style="background-color: rgba(68,54,39, 0.1); margin:10px;">Checkout</button>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>'
        $('#itemsshelf').html(r);
        fillTableWithBooks(data, function (books) {
            $("#tableValues").html(books);
        });
        fillTableWithQuantity(data);
    }
}

function fillTableWithBooks(data, callBack){
    var r = '';
        for (var i = 0; i < data.length; i++) {
            fetchBook(data[i].ISBN, function (book) {
                r = r + '<td><img src="' + book[0].pictureURL + ' alt="' + book[0].ISBN + '" /> </td>\n' +
                    '                        <td>' + book[0].name + '</td>\n' +
                    '                        <td id = "' + book[0].ISBN + '"></td>\n' +
                    '                        <td class="text-right">' + book[0].price + '</td>\n' +
                    '                        <td class="text-right"><button class="btn btn-sm btn-danger"><i class="fa fa-trash"></i> </button> </td>';
            });
        }
        callBack(r);


}

function fillTableWithQuantity(data) {
    for (var i = 0; i < data.length; i++) {
        var t = '<input class="form-control" type="text" value="' + data[i].quantity + '" />';
        $("#"+data[i].ISBN).html(t);
    }
}

function fetchBook(ISBN, callBack) {
        var s = "http://hyp-2019-chiappalupi-iannucci.herokuapp.com/book/" + ISBN;
        // Use the filter endpoint
        jQuery.ajax({
            url: s,
            type: 'GET',
            dataType: 'json',
            Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
            success: (data) => {
                callBack(data);
            },
            error: () => {
                notifyerror("qualcosa è andato storto");
            }
        });
}


