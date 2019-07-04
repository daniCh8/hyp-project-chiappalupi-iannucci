"use strict";

// This function takes an array of books as input and returns the HTML necessary to display them.
function drawBooks(data) {
    var s = '';
    for (var i = 0; i < data.length; i++) {
            s = s + '<div class = "bookcontainer">';
        s = s + '<a class="booklink" href="#"> <div class="component">\n' +
            '    <ul class="align">\n' +
            '        <li>\n' +
            '            <figure class=\'book\'>\n' +
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

        };
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

        s = s + '<button> <div class="container" style="display: flex; flex-direction: column"> <img src="svg/mbri-cart-add.svg" alt="">  <p> Add to cart </p> </div> </button>'
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
            url: "https://hyp-2019-chiappalupi-iannucci.herokuapp.com/book/findBooksBy",
            type: 'GET',
            data: filter,
            dataType: 'json',
            success: (data) => {
                console.log('ajax success');
                var s = drawBooks(data);
                $('#bookshelf').html(s);
            },
            error: ()=>{
                notifyerror("qualcosa è andato storto");
            }
        });

    } else {
        // If no filter was specified, let's get them all!
        jQuery.ajax({
            url: 'https://hyp-2019-chiappalupi-iannucci.herokuapp.com/book',
            //TODO: parametrize url
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                console.log('ajax success');
                var s = drawBooks(data);
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

        fetchBooks(filter);
}

$(document).ready(() => {

    $("#searchbutton").click(searchClick);
    $("#searchbuttonSmall").click(searchClick);

    // As soon as the page loads, load all the books
    fetchBooks();

});


