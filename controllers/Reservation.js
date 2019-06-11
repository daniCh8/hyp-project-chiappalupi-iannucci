'use strict';

var utils = require('../utils/writer.js');
var Reservation = require('../service/ReservationService');

module.exports.addReservation = function addReservation (req, res, next) {
  var body = req.swagger.params['body'].value;
  Reservation.addReservation(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteReservation = function deleteReservation (req, res, next) {
  var username = req.swagger.params['username'].value;
  var ISBN = req.swagger.params['ISBN'].value;
  Reservation.deleteReservation(username, ISBN)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUserReservations = function deleteUserReservations (req, res, next) {
  var username = req.swagger.params['username'].value;
  Reservation.deleteUserReservations(username)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReservationsByUsername = function getReservationsByUsername (req, res, next) {
  var username = req.swagger.params['username'].value;
  Reservation.getReservationsByUsername(username)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateReservationBookQuantity = function updateReservationBookQuantity (req, res, next) {
  var username = req.swagger.params['username'].value;
  var ISBN = req.swagger.params['ISBN'].value;
  var quantity = req.swagger.params['quantity'].value;
  Reservation.updateReservationBookQuantity(username, ISBN, quantity)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
