'use strict';

var utils = require('../utils/writer.js');
var Author = require('../service/AuthorService');

module.exports.getAuthors = function getAuthors(req, res, next) {
    Author.getAuthors()
        .then(function(response) {
            var responseCode = 200
            if (response.length == 0) {
                responseCode = 404
                response = {
                    "success": false,
                    "errorMessage": "No authors found in the database"
                }
            }
            utils.writeJson(res, response, responseCode);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.addAuthor = function addAuthor(req, res, next) {
    var body = req.swagger.params['body'].value;
    var names = new array();
    array.push(body[name])
    Author.findAuthorsByName(names).then(function(response) {
        var controller = false
        for (var i = 0; i < response.length; i++) {
            if (body.birthday == response[i].birthday) {
                controller = true
            }
        }
        if (controller == true) {
            var json = {
                "success": false,
                "errorMessage": "Found another author with same properties (name, birthday)"
            }
            utils.writeJson(res, json, 409)
            return
        }
        Author.addAuthor(body)
            .then(function(response) {
                response = {
                    "success": true
                }
                utils.writeJson(res, response, 200);
            })
            .catch(function(response) {
                utils.writeJson(res, response);
            });
    })
};

module.exports.deleteAuthor = function deleteAuthor(req, res, next) {
    var ID = req.swagger.params['ID'].value;
    var responseCode = 200;
    Author.getAuthorByID(ID).then(function(response) {
        if (response.length == 0) {
            responseCode = 404
            response = {
                "success": false,
                "errorMessage": "No authors with this ID found in the database."
            }
            utils.writeJson(res, response, responseCode);
        } else {
            Author.deleteAuthor(ID)
                .then(function(response) {
                    var json = {
                        "success": true
                    }
                    utils.writeJson(res, json, responseCode);
                })
                .catch(function(response) {
                    utils.writeJson(res, response);
                });
        }
    })
};

module.exports.getAuthorByID = function getAuthorByID(req, res, next) {
    var ID = req.swagger.params['ID'].value;
    Author.getAuthorByID(ID)
        .then(function(response) {
            var responseCode = 200
            if (response.length == 0) {
                responseCode = 404
                response = {
                    "success": false,
                    "errorMessage": "No authors with this ID found in the database."
                }
            } else {
                var box = response[0]
                response = box
            }
            utils.writeJson(res, response, responseCode);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.findAuthorsByName = function findAuthorsByName(req, res, next) {
    var names = req.swagger.params['name'].value;
    Author.findAuthorsByName(names)
        .then(function(response) {
            utils.writeJson(res, response);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};