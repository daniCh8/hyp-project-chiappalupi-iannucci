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
  var iD = req.swagger.params['ID'].value;
  var iSBN = req.swagger.params['ISBN'].value;
  var api_key = req.swagger.params['api_key'].value;
  Reservation.deleteReservation(iD,iSBN,api_key)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUserReservations = function deleteUserReservations (req, res, next) {
  var username = req.swagger.params['username'].value;
  var api_key = req.swagger.params['api_key'].value;
  Reservation.deleteUserReservations(username,api_key)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReservationByID = function getReservationByID (req, res, next) {
  var iD = req.swagger.params['ID'].value;
  Reservation.getReservationByID(iD)
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

module.exports.updateReservation = function updateReservation (req, res, next) {
  var body = req.swagger.params['body'].value;
  Reservation.updateReservation(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateReservationBookQuantity = function updateReservationBookQuantity (req, res, next) {
  var iD = req.swagger.params['ID'].value;
  var iSBN = req.swagger.params['ISBN'].value;
  var quantity = req.swagger.params['Quantity'].value;
  var api_key = req.swagger.params['api_key'].value;
  Reservation.updateReservationBookQuantity(iD,iSBN,quantity,api_key)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
