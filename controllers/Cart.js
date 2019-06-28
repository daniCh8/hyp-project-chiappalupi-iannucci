'use strict';

var utils = require('../utils/writer.js');
var Cart = require('../service/CartService');

module.exports.getCart = function getBooks(req, res, next) {
    if (!req.loggedin) {
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

module.exports.addOrder = function getBooks(req, res, next) {
    if (!req.loggedin) {
        var json = {
            "success": false,
            "errorMessage": "You are not logged in."
        }
        utils.writeJson(res, json)
    } else {
        var body = req.swagger.params['body'].value;
        var id = req.session.id
        Cart.addOrder(body, id).then(function(response) {
                utils.writeJson(res, response);
            })
            .catch(function(response) {
                utils.writeJson(res, response);
            });
    }
};