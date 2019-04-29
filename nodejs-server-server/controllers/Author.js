'use strict';

var utils = require('../utils/writer.js');
var Author = require('../service/AuthorService');

module.exports.addAuthor = function addAuthor (req, res, next) {
  var body = req.swagger.params['body'].value;
  Author.addAuthor(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteAuthor = function deleteAuthor (req, res, next) {
  var iD = req.swagger.params['ID'].value;
  var api_key = req.swagger.params['api_key'].value;
  Author.deleteAuthor(iD,api_key)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBookByID = function getBookByID (req, res, next) {
  var iD = req.swagger.params['ID'].value;
  Author.getBookByID(iD)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateAuthor = function updateAuthor (req, res, next) {
  var body = req.swagger.params['body'].value;
  Author.updateAuthor(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
