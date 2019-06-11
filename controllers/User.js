'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

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
                "logged in": true
            }
            if (response != true) json = {
                "wrong username or password": true
            }
            utils.writeJson(res, json);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.userRegister = function userRegister(req, res, next) {
    var body = req.swagger.params["body"].value;
    User.userRegister(body)
        .then(function(response) {
            utils.writeJson(res, response);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.deleteUser = function deleteUser(req, res, next) {
    var username = req.swagger.params['username'].value;
    User.deleteUser(username)
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