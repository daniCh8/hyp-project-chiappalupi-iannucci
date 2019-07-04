"use strict";


// This function retrieves items in the cart from the server and builds the UI accordingly
function fetchItems() {
    jQuery.ajax({
        url: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com/cart",
        type: 'GET',
        data: filter,
        dataType: 'json',
        success: (data) => {
            console.log('ajax success');
            fetchBook(data);
        },
        error: ()=>{
            notifyerror("qualcosa è andato storto");
        }
    });
}


$(document).ready(() => {

    isUserLoggedIn(function(loggato) {
        if (loggato) {
            //alert("L'utente è loggato!");
            fetchItems();
        } else {
            //alert("L'utente NON è loggato!");
            window.location.replace("myaccount.html");
        }
    });

});


function isUserLoggedIn(callBack) {
    jQuery.ajax({
        url: 'http://hyp-2019-chiappalupi-iannucci.herokuapp.com/user',
        type: 'GET',
        dataType: 'json',
        credentials: 'same-origin',
        Origin: "http://hyp-2019-chiappalupi-iannucci.herokuapp.com",
        success: (result) => {
            console.log('ajax success');
            callBack(true);
        },
        error: (result) => {
            callBack(false);
            console.log('ajax error')
            console.log(result.errorMessage)
            notifyerror(result.errorMessage);
        }
    });
}



function fetchBook(prevData) {
    for(var i = 0; i < prevData.length; i++){
        var s = "http://hyp-2019-chiappalupi-iannucci.herokuapp.com/book/" + data[i].ISBN;
        // Use the filter endpoint
        jQuery.ajax({
            url: s,
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                console.log('ajax success');
                var r = drawBook(data, prevData[i]);
                $('#itemsshelf').append(r);
            },
            error: () => {
                notifyerror("qualcosa è andato storto");
            }
        });
    }
}


function drawBook(data, prevData) {
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
        s = s + '<p class = "paragraph-fav-best"> Quantity: ' + prevData.quantity + '</p>';
        s = s + "</div>";

    return s;
}