'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.getEvents = function getEvents(req, res, next) {
    Event.getEvents()
        .then(function(response) {
            if (response.length == 0) {
                var json = {
                    "success": false,
                    "errorMessage": "No event found in the database"
                }
                utils.writeJson(res, json, 404)
            } else utils.writeJson(res, response, 200);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.addEvent = function addEvent(req, res, next) {
    var body = req.swagger.params['body'].value;
    Event.addEvent(body)
        .then(function(response) {
            utils.writeJson(res, response);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.deleteEvent = function deleteEvent(req, res, next) {
    var ID = req.swagger.params['ID'].value;
    var json = {
        "success": true
    }
    Event.getEventByID(ID)
        .then(function(response) {
            if (response.length == 0) {
                json = {
                    "success": false,
                    "errorMessage": "No event with this ID found"
                }
                utils.writeJson(res, json, 404)
                return
            } else {
                return Event.deleteEvent(ID)
                    .then(function(response) {
                        utils.writeJson(res, json, 200);
                    })
                    .catch(function(response) {
                        utils.writeJson(res, response);
                    });
            }
        });
}

module.exports.getEventByID = function getEventByID(req, res, next) {
    var ID = req.swagger.params['ID'].value;
    var responseCode = 200
    Event.getEventByID(ID)
        .then(function(response) {
            if (response.length == 0) {
                response = {
                    "success": false,
                    "errorMessage": "No event with this ID found"
                }
                responseCode = 404
            }
            utils.writeJson(res, response, responseCode);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.getEventByShop = function getEventByShop(req, res, next) {
    var shop = req.swagger.params['shop'].value;
    var responseCode = 200
    Event.getEventByShop(shop)
        .then(function(response) {
            if (response.length == 0) {
                response = {
                    "success": false,
                    "errorMessage": "No events found for the shop provided"
                }
                responseCode = 404
            }
            utils.writeJson(res, response, responseCode);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.getEventByISBN = function getEventByISBN(req, res, next) {
    var ISBN = req.swagger.params['ISBN'].value;
    var responseCode = 200
    Event.getEventByISBN(ISBN)
        .then(function(response) {
            if (response.length == 0) {
                response = {
                    "success": false,
                    "errorMessage": "No events found for the shop provided"
                }
                responseCode = 404
            }
            utils.writeJson(res, response, responseCode);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};