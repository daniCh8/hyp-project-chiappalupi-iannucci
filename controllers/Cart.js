'use strict';

var utils = require('../utils/writer.js');
var Cart = require('../service/CartService');

module.exports.getCart = function getCart(req, res, next) {
    if (!req.session.loggedin) {
        var json = {
            "success": false,
            "errorMessage": "You are not logged in."
        }
        utils.writeJson(res, json)
    } else {
        Cart.getCart(req).then(function(response) {
                utils.writeJson(res, response);
            })
            .catch(function(response) {
                utils.writeJson(res, response);
            });
    }
};

module.exports.addOrder = function addOrder(req, res, next) {
    if (!req.session.loggedin) {
        var json = {
            "success": false,
            "errorMessage": "You are not logged in."
        }
        utils.writeJson(res, json)
    } else {
        var json = {
            "success": true
        }
        var body = req.swagger.params['body'].value;
        var id = req.session.id
        Cart.checkISBNInCart(body.ISBN, id).then(function(check) {
            if (check.length > 0) {
                json = {
                    "success": false,
                    "errorMessage": "There is alread a book whith this ISBN in your cart."
                }
                utils.writeJson(res, json);
                return;
            }
        Cart.addOrder(body, id).then(function(response) {
                utils.writeJson(res, json);
            })
            .catch(function(response) {
                utils.writeJson(res, json);
            });
    }) }
};

module.exports.deleteOrder = function deleteOrder(req, res, next) {
    if (!req.session.loggedin) {
        var json = {
            "success": false,
            "errorMessage": "You are not logged in."
        }
        utils.writeJson(res, json)
    } else {
        var json = {
            "success": true
        }
        var ISBN = req.swagger.params['ISBN'].value;
        var id = req.session.id
        Cart.checkISBNInCart(ISBN, id).then(function(check) {
            if (check.length == 0) {
                json = {
                    "success": false,
                    "errorMessage": "There isn't any book whith this ISBN in your cart."
                }
                utils.writeJson(res, json);
                return;
            }
            Cart.deleteOrder(ISBN, id).then(function(response) {
                    utils.writeJson(res, json);
                })
                .catch(function(response) {
                    utils.writeJson(res, json);
                });
        })
    }
};

module.exports.clearCart = function clearCart(req, res, next) {
    if (!req.session.loggedin) {
        var json = {
            "success": false,
            "errorMessage": "You are not logged in."
        }
        utils.writeJson(res, json)
    } else {
        var json = {
            "success": true
        }
        var id = req.session.id
        Cart.clearCart(id).then(function(response) {
                utils.writeJson(res, json);
            })
            .catch(function(response) {
                utils.writeJson(res, json);
            });
    }
};

module.exports.updateBookQuantity = function deleteOrder(req, res, next) {
    if (!req.session.loggedin) {
        var json = {
            "success": false,
            "errorMessage": "You are not logged in."
        }
        utils.writeJson(res, json)
    } else {
        var json = {
            "success": true
        }
        var ISBN = req.swagger.params['ISBN'].value;
        var newQuantity = req.swagger.params['quantity'].value;
        var id = req.session.id
        Cart.checkISBNInCart(ISBN, id).then(function(check) {
            if (check.length == 0) {
                json = {
                    "success": false,
                    "errorMessage": "There isn't any book whith this ISBN in your cart."
                }
                utils.writeJson(res, json);
                return;
            }
            Cart.updateQuantity(ISBN, newQuantity, id).then(function(response) {
                    utils.writeJson(res, json);
                })
                .catch(function(response) {
                    utils.writeJson(res, json);
                });
        })
    }
};