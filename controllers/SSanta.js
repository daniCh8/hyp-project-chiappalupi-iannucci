'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService.js');
let uuidv1 = require('uuid/v1');
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
var SSanta = require('../service/SSantaService.js');
var players_array = ["DanieleChiappalupi", "ElenaIannucci", "AndreaGerminario", "TommasoBianchi", "AndreiKolar", "JacopoMargarini", "EmanueleEsposito", "FrancescoCordiano", "EnricoToniato", "DanieleBuccheri"];

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
}

module.exports.getSSantaUser = function getSSantaUser(req, res, next) {
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
                var name_lastname = response[0].firstName.concat(response[0].lastName);
                if(!players_array.includes(name_lastname)) {
                    var json = {
                        "success": false,
                        "errorMessage": "You are not logged in a player's account."
                    }
                    req.session.loggedin = false
                    utils.writeJson(res, json, 401)
                    return;
                } else utils.writeJson(res, response, 200);
            })
            .catch(function(response) {
                utils.writeJson(res, response);
            });
    })
};

module.exports.SSantaLogin = function SSantaLogin(req, res, next) {
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
    SSanta.ssantaUserLogin(req, username, password)
        .then(function(response) {
            if (response == true) {
                req.session.loggedin = true
                var responseCode = 200
                var json = {
                    "success": true
                }
                utils.writeJson(res, json, responseCode);
                return;
            }
            else {
                var json;
                if(response == -8) {
                    json = {
                        "success": false,
                        "errorMessage": "This account does not participate to the game."
                    }
                }
                else {
                    var json = {
                        "success": false,
                        "errorMessage": "Wrong username or password."
                    }
                }
                var responseCode = 404
                utils.writeJson(res, json, responseCode);
                return;
            }
        })
        .catch(function(response) {
            utils.writeJson(res, response, responseCode);
        });
};

module.exports.SSantaRegister = function SSantaRegister(req, res, next) {
    if (req.swagger.params["username"] == undefined || req.swagger.params["firstName"] == undefined || req.swagger.params["lastName"] == undefined || req.swagger.params["password"] == undefined) {
        var json = {
            "success": false,
            "errorMessage": "Please, compile all the parameters of the form."
        }
        utils.writeJson(res, json, 400)
        return;
    }
    var firstName = req.swagger.params["firstName"].value;
    var lastName = req.swagger.params["lastName"].value;
    var totalName = firstName.concat(lastName);
    if(!players_array.includes(totalName)) {
        var json = {
            "success": false,
            "errorMessage": "You have to be a Secret Santa player to register. Please, check your first name and last name."
        }
        utils.writeJson(res, json, 400);
        return;
    }
    var username = req.swagger.params["username"].value;
    var email = "Secret Santa email";
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
            SSanta.checkNameAvailability(body.firstName, body.lastName).then(function(response) {
                if (!isEmpty(response)) {
                    var json = {
                        "success": false,
                        "errorMessage": "This secret santa player already exists!"
                    }
                    utils.writeJson(res, json, 409);
                } else {
                    User.userRegister(body).then(function(response) {
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
        }
    })
};

module.exports.getSSantaTarget = function getSSantaTarget(req, res, next) {
    if (!req.session.loggedin) {
        var json = {
            "success": false,
            "errorMessage": "You are not logged in"
        }
        utils.writeJson(res, json, 401)
        return;
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
                var name_lastname = response[0].firstName.concat(response[0].lastName);
                if(!players_array.includes(name_lastname)) {
                    var json = {
                        "success": false,
                        "errorMessage": "You are not logged in a player's account."
                    }
                    req.session.loggedin = false
                    utils.writeJson(res, json, 401)
                    return;
                } else return SSanta.getSSantaTarget(name_lastname).then(function(response) {
                    var json = {
                        "success": true,
                        "target": response.toString()
                    }
                    utils.writeJson(res, json, 200);
                })
            })
            .catch(function(response) {
                utils.writeJson(res, response);
            });
    })
};

module.exports.logoutSSantaUser = function logoutSSantaUser(req, res, next) {
    var json
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