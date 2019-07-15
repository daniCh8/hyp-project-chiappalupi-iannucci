"use strict";

$(document).ready(() => {
    fetchEvents();
});

function drawEvents(data) {
    var date = '';
    var dateData = '';
    var time = '';
    var s = '';
    for (var i = 0; i < data.length; i++) {
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
    return s;
}

function fetchEvents() {
    jQuery.ajax({
        url: 'https://hyp-2019-chiappalupi-iannucci.herokuapp.com/event',
        type: 'GET',
        dataType: 'json',
        Origin: "https://hyp-2019-chiappalupi-iannucci.herokuapp.com",
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