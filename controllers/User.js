'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');
let uuidv1 = require('uuid/v1');

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
}

module.exports.getUser = function getUser(req, res, next) {
    if (!req.session.loggedin) {
        var json = {
            "success": false,
            "errorMessage": "You are not logged in"
        }
        utils.writeJson(res, json, 401)
        return
    }
    var id = req.session.id
    User.getUser(id).then(function(response) {
            delete response[0].password
            utils.writeJson(res, response, 200);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.userLogin = function userLogin(req, res, next) {
    if (req.session.loggedin) {
        var json = {
            "success": false,
            "errorMessage": "You are already logged in"
        }
        utils.writeJson(res, json)
        return
    }
    var username = req.swagger.params['username'].value;
    var password = req.swagger.params['password'].value;
    User.userLogin(req, username, password)
        .then(function(response) {
            if (response == true) {
                req.session.loggedin = true
            }
            return response;
        }).then(function(response) {
            var json = {
                "success": true
            }
            if (response != true) json = {
                "success": false,
                "errorMessage": "wrong username or password"
            }
            utils.writeJson(res, json);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.userRegister = function userRegister(req, res, next) {
    var body = req.swagger.params["body"].value;
    User.checkUsernameAvailability(body.username).then(function(response) {
        if (!isEmpty(response)) {
            var json = {
                "success": false,
                "errorMessage": "This username already exists"
            }
            utils.writeJson(res, json);
        } else {
            var json = {
                "success": true
            }
            User.userRegister(body)
                .then(function(response) {
                    utils.writeJson(res, json);
                })
                .catch(function(response) {
                    utils.writeJson(res, response);
                });
        }
    })
};

module.exports.logoutUser = function logoutUser(req, res, next) {
    var json
    var previousID = req.session.id
    if (req.session.loggedin == true) {
        req.session.loggedin = false;
        req.session.id = uuidv1()
        json = {
            "success": true
        }
    } else {
        json = {
            "success": false,
            "errorMessage": "You are not logged in."
        }
        utils.writeJson(res, json);
        return
    }
    utils.writeJson(res, json);
};