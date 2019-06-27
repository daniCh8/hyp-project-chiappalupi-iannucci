'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
}

module.exports.userLogin = function userLogin(req, res, next) {
    var username = req.swagger.params['username'].value;
    var password = req.swagger.params['password'].value;
    User.userLogin(username, password)
        .then(function(response) {
            if (response == true)
                req.session.loggedin = true
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
                "errorMessage": "This username already exists."
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

module.exports.deleteUser = function deleteUser(req, res, next) {
    var username = req.swagger.params['username'].value;
    User.deleteUser(username)
        .then(function(response) {
            if (!req.loggedin) response = {
                "success": false,
                "errorMessage": "not authorized"
            }
            utils.writeJson(res, response);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.getUserByName = function getUserByName(req, res, next) {
    var username = req.swagger.params['username'].value;
    User.getUserByName(username)
        .then(function(response) {
            if (!req.loggedin) response = {
                "not authorized": true
            }
            utils.writeJson(res, response);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.logoutUser = function logoutUser(req, res, next) {
    if (req.session.loggedin == true) req.session.loggedin = false;
    User.logoutUser()
        .then(function(response) {
            utils.writeJson(res, response);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};