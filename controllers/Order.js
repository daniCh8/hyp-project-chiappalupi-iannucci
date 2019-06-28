'use strict';

var utils = require('../utils/writer.js');
var Order = require('../service/OrderService');

module.exports.addOrder = function addOrder (req, res, next) {
  var body = req.swagger.params['body'].value;
  Order.addOrder(body)
    .then(function (response) {
      if(!req.session.loggedin) response = {
        "success": false,
        "errorMessage": "You are not logged in"
      }
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteOrder = function deleteOrder (req, res, next) {
  var username = req.swagger.params['username'].value;
  var ISBN = req.swagger.params['ISBN'].value;
  Order.deleteOrder(username, ISBN)
    .then(function (response) {
      if(!req.session.loggedin) response = {
        "success": false,
        "errorMessage": "You are not logged in"
      }
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUserOrders = function deleteUserOrders (req, res, next) {
  var username = req.swagger.params['username'].value;
  Order.deleteUserOrders(username)
    .then(function (response) {
      if(!req.session.loggedin) response = {
        "success": false,
        "errorMessage": "You are not logged in"
      }
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOrdersByUsername = function getOrdersByUsername (req, res, next) {
  var username = req.swagger.params['username'].value;
  Order.getOrdersByUsername(username)
    .then(function (response) {
      if(!req.session.loggedin) response = {
        "success": false,
        "errorMessage": "You are not logged in"
      }
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateOrderBookQuantity = function updateOrderBookQuantity (req, res, next) {
  var username = req.swagger.params['username'].value;
  var ISBN = req.swagger.params['ISBN'].value;
  var quantity = req.swagger.params['quantity'].value;
  Order.updateOrderBookQuantity(username, ISBN, quantity)
    .then(function (response) {
      if(!req.session.loggedin) response = {
        "success": false,
        "errorMessage": "You are not logged in"
      }
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
