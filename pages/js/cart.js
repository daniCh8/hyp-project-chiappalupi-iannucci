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

            '<tbody>\n';
        for(var i=0; i<data.length; i++) {
            r = r + '<tr>\n' +
                '                        <td id="img'+data[i].ISBN+'"></td>\n' +
                '                        <td id="name'+data[i].ISBN+'"></td>\n' +
                '                        <td id="quantity'+data[i].ISBN+'"></td>\n' +
                '                        <td class="text-right" id="price'+data[i].ISBN+'"></td>\n' +
                '                        <td class="text-right"><button ><img src="svg/mbri-update.svg"></img> </button> </td>\n' +
                '                    </tr>';
        }
        var total = 0;
        for(var j=0; j<data.length;j++){
            total = total+data[j].cost;
        }

            r = r + '                    <tr>\n' +
            '                        <td></td>\n' +
            '                        <td></td>\n' +
            '                        <td></td>\n' +
            '                        <td><strong>Total</strong></td>\n' +
            '                        <td class="text-right"><strong>'+total+'</strong></td>\n' +
            '                    </tr>\n' +
            '                    </tbody>\n' +
            '                </table>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="col mb-2">\n' +
            '            <div class="row">\n' +
            '                <div class="col-sm-12  col-md-6">\n' +
            '                    <button onclick="goToAllBooks();" class="btn btn-block " style="background-color: rgba(68,54,39, 0.1); margin: 10px;">Continue Shopping</button>\n' +
            '                </div>\n' +
            '                <div class="col-sm-12 col-md-6 text-right">\n' +
            '                    <button class="btn btn-lg btn-block  text-uppercase" style="background-color: rgba(68,54,39, 0.1); margin:10px;">Checkout</button>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>'
        $('#itemsshelf').html(r);
        fillTableWithBooks(data);
    }
}

function fillTableWithBooks(data) {
    for (var i = 0; i < data.length; i++) {
        fetchBook(data[i].ISBN);
    }
    fillTableWithQuantity(data);
}

function fillTableWithQuantity(data) {
    for (var i = 0; i < data.length; i++) {
        var t = '<input class="form-control" type="text" value="' + data[i].quantity + '" />';
        $("#quantity"+data[i].ISBN).html(t);
    }
}

function fetchBook(ISBN) {
        var s = "http://hyp-2019-chiappalupi-iannucci.herokuapp.com/book/" + ISBN;
        // Use the filter endpoint
        jQuery.ajax({
            url: s,
            type: 'GET',
            dataType: 'json',
            Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
            success: (book) => {
                var i = '<a href="book.html?name='+book[0].name+'"><img src="'+book[0].pictureURL+'" style="max-width: 100px"></a>';
                var n = '<p>'+book[0].name+'</p>';
                var p = '<p>'+book[0].price+'</p>';
                $("#img" + book[0].ISBN ).append(i);
                $("#name" + book[0].ISBN ).append(n);
                $("#price" + book[0].ISBN ).append(p);
            },
            error: () => {
                notifyerror("qualcosa è andato storto");
            }
        });
}

function goToAllBooks() {
    window.location.replace("books.html");
}
