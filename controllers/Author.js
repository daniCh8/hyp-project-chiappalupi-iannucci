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
  Author.deleteAuthor(ID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAuthorByID = function getAuthorByID (req, res, next) {
  var ID = req.swagger.params['ID'].value;
  //console.log("ma qui ci arrivo?")
  Author.getAuthorByID(ID)
    .then(function (response) {
      /*console.log("oh zio siamo qui")
      var responseCode = 200
      console.log("oh zio responseCode1")
      console.log(responseCode)
      console.log("oh zio response")
      console.log(response)
      console.log("oh zio response.length")
      console.log(response.length)
      if(response.length == 0) responseCode = 404*/
      utils.writeJson(res, response/*, responseCode*/);
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