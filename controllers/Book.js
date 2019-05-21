'use strict';

var utils = require('../utils/writer.js');
var Book = require('../service/BookService');

module.exports.addBook = function addBook (req, res, next) {
  var body = req.swagger.params['body'].value;
  Book.addBook(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBooks = function getBooks (req, res, next) {
  Book.getBooks()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteBook = function deleteBook (req, res, next) {
  var ISBN = req.swagger.params['ISBN'].value;
  var api_key = req.swagger.params['api_key'].value;
  Book.deleteBook(ISBN,api_key)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findBooksByName = function findBooksByName (req, res, next) {
  var name = req.swagger.params['name'].value;
  Book.findBooksByName(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findBooksByAuthors = function findBooksByAuthors (req, res, next) {
  var authors = req.swagger.params['authors'].value;
  Book.findBooksByAuthors(authors)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findBooksByThemes = function findBooksByThemes (req, res, next) {
  var themes = req.swagger.params['themes'].value;
  Book.findBooksByThemes(themes)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBookByISBN = function getBookByISBN (req, res, next) {
  var iSBN = req.swagger.params['ISBN'].value;
  console.log("ciao sono arrivato fino a " + iSBN);
  Book.getBookByISBN(iSBN)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateBook = function updateBook (req, res, next) {
  var body = req.swagger.params['body'].value;
  Book.updateBook(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.uploadFile = function uploadFile (req, res, next) {
  var iSBN = req.swagger.params['ISBN'].value;
  var additionalMetadata = req.swagger.params['additionalMetadata'].value;
  var file = req.swagger.params['file'].value;
  Book.uploadFile(iSBN,additionalMetadata,file)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
