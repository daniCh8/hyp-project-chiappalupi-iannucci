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
            '                        <th scope="col" class="text-center">Price</th>\n' +
            '                        <th scope="col" class="text-right">Quantity</th>\n' +
            '                        <th> </th>\n' +
            '                    </tr>\n' +
            '                    </thead>\n' +

            '<tbody>\n';
        for(var i=0; i<data.length; i++) {
            s = s + '                    <tr>\n' +
            '                        <div id="'+data[i].ISBN+'">\n' +
            '                        </div>\n' +
                '                        <div id="'+data[i].ISBN+'qnt">\n' +
                '                        </div>\n' +
            '                        <td class="text-right"><button class="btn btn-sm btn-danger"><img src="svg/mbri-trash.svg"/> </button> </td>\n' +
            '                    </tr>\n';
        }



            s = s + '                    <tr>\n' +
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
        fillTableWithBooks(data);
    }
}

function fillTableWithBooks(data){
    new Promise(function (data) {
        for (var i = 0; i < data.length; i++) {
            fetchBook(data[i].ISBN);
        }

    }).then(function (response) {fillTableWithQuantity(data);})}

function fillTableWithQuantity(data) {
    for (var i = 0; i < data.length; i++) {
        var t = '<td><input class="form-control" type="text" value="' + data[i].quantity + '" /></td>';
        $("#"+data[i].ISBN+"qnt").html(t);
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
                var r = '<td><img src="' + book[0].pictureURL + '" /> </td>' +
                    '<td>'+book[0].title+'</td>' +
                    '<td class="text-center">' + book[0].price + '" /> </td>';
                $("#" + book[0].ISBN ).append(r);
            },
            error: () => {
                notifyerror("qualcosa è andato storto");
            }
        });
}


