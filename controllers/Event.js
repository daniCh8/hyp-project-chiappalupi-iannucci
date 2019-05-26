'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.getEvents = function getEvents (req, res, next) {
  Event.getEvents()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

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

module.exports.deleteEvent = function deleteEvent (req, res, next) {
  var ID = req.swagger.params['ID'].value;
  Event.deleteEvent(ID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEventByID = function getEventByID (req, res, next) {
  var ID = req.swagger.params['ID'].value;
  Event.getEventByID(ID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEventByISBN = function getEventByISBN (req, res, next) {
  var ISBN = req.swagger.params['ISBN'].value;
  Event.getEventByISBN(ISBN)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};