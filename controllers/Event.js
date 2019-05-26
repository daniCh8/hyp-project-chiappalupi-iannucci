'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.addEvent = function addEvent (req, res, next) {
  var body = req.swagger.params['body'].value;
  Event.addEvent(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEventByID = function getEventByID (req, res, next) {
  var iD = req.swagger.params['ID'].value;
  Event.getEventByID(iD)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEventByISBN = function getEventByISBN (req, res, next) {
  var iSBN = req.swagger.params['ISBN'].value;
  Event.getEventByISBN(iSBN)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};