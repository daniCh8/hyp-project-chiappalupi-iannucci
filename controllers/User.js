'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');
let uuidv1 = require('uuid/v1');
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");

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
    User.checkUserSession(id).then(function(response) {
        if (response.length == 0 || response == undefined) {
            var json = {
                "success": false,
                "errorMessage": "You are not logged in"
            }
            req.session.loggedin = false
            utils.writeJson(res, json, 401)
            return;
        } else return User.getUser(id).then(function(response) {
                delete response[0].password
                utils.writeJson(res, response, 200);
            })
            .catch(function(response) {
                utils.writeJson(res, response);
            });
    })
};

module.exports.userLogin = function userLogin(req, res, next) {
    if (req.swagger.params["username"] == undefined || req.swagger.params["password"] == undefined) {
        var json = {
            "success": false,
            "errorMessage": "Please, compile all the parameters of the form."
        }
        utils.writeJson(res, json, 400)
        return;
    }
    var username = req.swagger.params['username'].value;
    var tmp = req.swagger.params['password'].value;
    var password = CryptoJS.AES.encrypt(tmp, "Secret Passphrase").toString();
    if (username == "" || password == "") {
        var json = {
            "success": false,
            "errorMessage": "Please, compile all the parameters of the form."
        }
        utils.writeJson(res, json, 400)
        return;
    }
    User.userLogin(req, username, password)
        .then(function(response) {
            var responseCode = 200
            if (response == true) {
                req.session.loggedin = true
            }
            var json = {
                "success": true
            }
            if (response != true) {
                json = {
                    "success": false,
                    "errorMessage": "Wrong username or password."
                }
                responseCode = 404
            }
            utils.writeJson(res, json, responseCode);
        })
        .catch(function(response) {
            utils.writeJson(res, response, responseCode);
        });
};

module.exports.userRegister = function userRegister(req, res, next) {
    if (req.swagger.params["username"] == undefined || req.swagger.params["firstName"] == undefined || req.swagger.params["lastName"] == undefined || req.swagger.params["email"] == undefined || req.swagger.params["password"] == undefined) {
        var json = {
            "success": false,
            "errorMessage": "Please, compile all the parameters of the form."
        }
        utils.writeJson(res, json, 400)
        return;
    }
    var username = req.swagger.params["username"].value;
    var firstName = req.swagger.params["firstName"].value;
    var lastName = req.swagger.params["lastName"].value;
    var email = req.swagger.params["email"].value;
    var tmp = req.swagger.params["password"].value;
    var password = CryptoJS.AES.encrypt(tmp, "Secret Passphrase").toString();
    var body = {
        "username": username,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password
    }
    if (username == "" || firstName == "" || lastName == "" || email == "" || password == "") {
        var json = {
            "success": false,
            "errorMessage": "Please, compile all the parameters of the form."
        }
        utils.writeJson(res, json, 400)
        return;
    }
    User.checkUsernameAvailability(body.username).then(function(response) {
        if (!isEmpty(response)) {
            var json = {
                "success": false,
                "errorMessage": "This username already exists"
            }
            utils.writeJson(res, json, 409);
        } else {
            User.userRegister(body)
                .then(function(response) {
                    User.userLogin(req, username, password).then(function(response) {
                        var json = {
                            "success": true
                        }
                        req.session.loggedin = true;
                        utils.writeJson(res, json, 200);
                    }).catch(function(response) {
                        utils.writeJson(res, response);
                    });
                })
        }
    })
};

module.exports.logoutUser = function logoutUser(req, res, next) {
    console.log("\nREQ.SESSION.ID - BEFORE:")
    console.log(req.session.id);
    console.log("\n");
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
        utils.writeJson(res, json, 401);
        return
    }
    utils.writeJson(res, json, 200);
};