'use strict';

var utils = require('../utils/writer.js');
var Cart = require('../service/CartService');

module.exports.getCart = function getBooks (req, res, next) {
  var username = req.swagger.params['username'].value;
    Cart.getCart(username).then(function (response) {
      if(!req.loggedin) response = {
        "not authorized": true
      }
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};