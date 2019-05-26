'use strict';

var utils = require('../utils/writer.js');
var Author = require('../service/AuthorService');

module.exports.getAuthors = function getAuthors (req, res, next) {
  Author.getAuthors()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

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
  var ID = req.swagger.params['ID'].value;
  var api_key = req.swagger.params['api_key'].value;
  Author.deleteAuthor(ID,api_key)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAuthorByID = function getAuthorByID (req, res, next) {
  var ID = req.swagger.params['ID'].value;
  Author.getAuthorByID(ID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findAuthorsByName = function findAuthorsByName (req, res, next) {
  var names = req.swagger.params['name'].value;
  Author.findAuthorsByName(names)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};