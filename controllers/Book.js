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
            var responseCode = 200
            if (response.length == 0) {
                response = {
                    "success": false,
                    "errorMessage": "No favourite book found in the database"
                }
                responseCode = 404
            }
            utils.writeJson(res, response, responseCode);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.getBestsellers = function getBestsellers(req, res, next) {
    Book.getBestsellers().then(function(response) {
            var responseCode = 200
            if (response.length == 0) {
                response = {
                    "success": "false",
                    "errorMessage": "No sold book found in the database"
                }
                responseCode = 404
            }
            utils.writeJson(res, response, responseCode);
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
            utils.writeJson(res, json, 409);
        } else {
            Book.addBook(body)
                .then(function(response) {
                    response = {
                        "success": "true"
                    }
                    utils.writeJson(res, response, 200);
                })
                .catch(function(response) {
                    utils.writeJson(res, response);
                });
        }
    })
};

module.exports.getBooks = function getBooks(req, res, next) {
    Book.getBooks().then(function(response) {
            var responseCode = 200
            if (response.length == 0) {
                response = {
                    "success": false,
                    "errorMessage": "No books found in the database"
                }
                responseCode = 404
            }
            utils.writeJson(res, response, responseCode);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};

module.exports.findBooksBy = function findBooksBy(req, res, next) {
    var genres = req.swagger.params['genres'].value;
    var themes = req.swagger.params['themes'].value;
    var author = [req.swagger.params['author'].value]
    var name = [req.swagger.params['name'].value]
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
    Book.getBookByISBN(ISBN).then(function(response) {
        var json
        if (response.length == 0) {
            json = {
                "success": false,
                "errorMessage": "No books found with the ISBN provided."
            }
            utils.writeJson(res, response, 404);
        } else {
            Book.deleteBook(ISBN)
                .then(function(response) {
                    response = {
                        "success": true
                    }
                    utils.writeJson(res, response, 200);
                })
                .catch(function(response) {
                    utils.writeJson(res, response);
                });
        }
    })
};

module.exports.getBookByISBN = function getBookByISBN(req, res, next) {
    var ISBN = req.swagger.params['ISBN'].value;
    Book.getBookByISBN(ISBN)
        .then(function(response) {
            var responseCode = 200
            if (response.length == 0) {
                response = {
                    "success": false,
                    "errorMessage": "No books with this ISBN found"
                }
                responseCode = 404
            }
            utils.writeJson(res, response, responseCode);
        })
        .catch(function(response) {
            utils.writeJson(res, response);
        });
};