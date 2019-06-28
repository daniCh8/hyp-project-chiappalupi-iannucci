'use strict';

var utils = require('../utils/writer.js');
var Book = require('../service/BookService');

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
}

module.exports.getFavouriteBooks = function getFavouriteBooks(req, res, next) {
    Book.getFavouriteBooks().then(function(response) {
            utils.writeJson(res, response);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.addBook = function addBook(req, res, next) {
    var body = req.swagger.params['body'].value;
    Book.getBookByISBN(body.ISBN).then(function(response) {
        if (!isEmpty(response) && response[0].ISBN == body.ISBN) {
            var json = {
                "success": false,
                "errorMessage": "ISBN already exists"
            }
            utils.writeJson(res, json);
        } else {
            Book.addBook(body)
                .then(function(response) {
                    utils.writeJson(res, response);
                })
                .catch(function(response) {
                    utils.writeJson(res, response);
                });
        }
    })
};

module.exports.getBooks = function getBooks(req, res, next) {
    Book.getBooks().then(function(response) {
            utils.writeJson(res, response);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.findBooksBy = function findBooksBy(req, res, next) {
    var genres = req.swagger.params['genres'].value;
    var themes = req.swagger.params['themes'].value;
    var author = [req.swagger.params['author'].value]
    var name   = [req.swagger.params['name'].value]
    Book.findBooksBy(genres, themes).then(function(firstResponse) {
            var returnJson = firstResponse;
            Book.findBooksByAuthors(author).then(function(secondResponse) {
                if (req.swagger.params['author'].value !== undefined) {
                    var box = returnJson.splice(0, returnJson.length)
                    for (var i = 0; i < box.length; i++) {
                        for (var j = 0; j < secondResponse.length; j++) {
                            if (box[i].ISBN == secondResponse[j].ISBN) { returnJson.push(box[i]) }
                        }
                    }
                }
                Book.findBooksByName(name).then(function(thirdResponse) {
                    if (req.swagger.params['name'].value !== undefined) {
                        var box = returnJson.splice(0, returnJson.length)
                        for (var i = 0; i < box.length; i++) {
                            for (var j = 0; j < thirdResponse.length; j++) {
                                if (box[i].ISBN == thirdResponse[j].ISBN) { returnJson.push(box[i]) }
                            }
                        }
                    }
                    utils.writeJson(res, returnJson);
                })
            })
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.deleteBook = function deleteBook(req, res, next) {
    var ISBN = req.swagger.params['ISBN'].value;
    Book.deleteBook(ISBN)
        .then(function(response) {
            utils.writeJson(res, response);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.findBooksByName = function findBooksByName(req, res, next) {
    var name = req.swagger.params['name'].value;
    Book.findBooksByName(name)
        .then(function(response) {
            utils.writeJson(res, response);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.findBooksByAuthors = function findBooksByAuthors(req, res, next) {
    var author = req.swagger.params['author'].value;
    Book.findBooksByAuthors(author)
        .then(function(response) {
            utils.writeJson(res, response);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.findBooksByThemes = function findBooksByThemes(req, res, next) {
    var theme = req.swagger.params['theme'].value;
    Book.findBooksByThemes(theme)
        .then(function(response) {
            utils.writeJson(res, response);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.getBookByISBN = function getBookByISBN(req, res, next) {
    var ISBN = req.swagger.params['ISBN'].value;
    Book.getBookByISBN(ISBN)
        .then(function(response) {
            utils.writeJson(res, response);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.uploadFile = function uploadFile(req, res, next) {
    var iSBN = req.swagger.params['ISBN'].value;
    var additionalMetadata = req.swagger.params['additionalMetadata'].value;
    var file = req.swagger.params['file'].value;
    Book.uploadFile(iSBN, additionalMetadata, file)
        .then(function(response) {
            utils.writeJson(res, response);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};