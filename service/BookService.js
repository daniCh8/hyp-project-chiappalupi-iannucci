"use strict";

let sqlDb;

exports.bookDbSetup = function(database) {
    sqlDb = database;
    console.log("Checking if book table exists");
    return database.schema.hasTable("book").then(exists => {
        if (!exists) {
            console.log("The table BOOK doesn't exists: creating it.");
            return database.schema.createTable("book", table => {
                table.text("ISBN");
                table.boolean("favourite");
                table.text("name");
                table.enum("theme", ["love", "death", "good vs. evil", "coming of age", "power and corruption", "survival", "courage and heroism", "prejudice", "individual vs. society", "war"]);
                table.enum("genre", ["fantasy", "science fiction", "westerns", "romance", "thriller", "mystery", "detective story", "dystopya", "memoir", "biography", "play", "musical", "satire", "haiku", "horror", "DIY", "dictionary", "young adult fiction", "children book", "adult literature"]);
                table.enum("status", ["available", "out of stock"]);
                table.text("pictureURL");
                table.float("price");
            });
        }
    });
};

exports.writtenByDbSetup = function(database) {
    sqlDb = database;
    console.log("Checking if writtenBy table exists");
    return database.schema.hasTable("writtenBy").then(exists => {
        if (!exists) {
            console.log("The table WRITTENBY doesn't exists: creating it.");
            return database.schema.createTable("writtenBy", table => {
                table.text("ISBN");
                table.integer("authorID");
            });
        }
    });
};

//toDo examples, some methods, tests

/**
 * Add a new book to the bookshop
 * 
 *
 * body Book Book object that needs to be added to the shop
 * no response value expected for this operation
 **/
exports.addBook = function(body) {
    let authorRows = body.authors.map(author => {
        return {
            "ISBN": body.ISBN,
            "authorID": author
        }
    })
    var bookObj = {
        "ISBN": body.ISBN,
        "name": body.name,
        "theme": body.theme,
        "genre": body.genre,
        "status": body.status,
        "pictureURL": body.pictureURL,
        "favourite": body.favourite,
        "price": body.price
    };
    return sqlDb('writtenBy').insert(authorRows).then(function(response) {
        return sqlDb('book').insert(bookObj)
    })
}

/**
 * Get all the books in the database
 * Returns a list of book
 *
 * returns list of Book
 **/
exports.getBooks = function() {
    return sqlDb.from('author AS a').join('writtenBy AS wb', 'wb.authorID', 'a.authorID').then(function(response) {
        var authorsJoined = response;
        return sqlDb('book').then(function(response) {
            for (var i = 0; i < response.length; i++) {
                var authorsArr = new Array()
                for (var j = 0; j < authorsJoined.length; j++) {
                    if (authorsJoined[j].ISBN == response[i].ISBN) {
                        authorsArr.push(authorsJoined[j].name)
                    }
                }
                response[i].authors = authorsArr
            }
            return response
        })
    })
};

/**
 * Finds our favourite books
 *
 * returns list of Book
 **/
exports.getFavouriteBooks = function() {
    return sqlDb.from('author AS a').join('writtenBy AS wb', 'wb.authorID', 'a.authorID').then(function(response) {
        var authorsJoined = response;
        return sqlDb('book').where('favourite', true).then(function(response) {
            for (var i = 0; i < response.length; i++) {
                var authorsArr = new Array()
                for (var j = 0; j < authorsJoined.length; j++) {
                    if (authorsJoined[j].ISBN == response[i].ISBN) {
                        authorsArr.push(authorsJoined[j].name)
                    }
                }
                response[i].authors = authorsArr
            }
            return response
        })
    })
};

/**
 * Finds the books that have sold the most
 *
 * returns list of Book
 **/
exports.getBestsellers = function() {
    return sqlDb.select('ISBN').from('orderHistory').sum('quantity').groupBy('ISBN').limit(9).orderBy('sum', 'desc').then(function(response) {
        var bestsellersISBN = response
        return sqlDb.from('author AS a').join('writtenBy AS wb', 'wb.authorID', 'a.authorID').then(function(response) {
            var authorsJoined = response;
            return sqlDb('book').then(function(response) {
                for (var i = 0; i < response.length; i++) {
                    var authorsArr = new Array()
                    for (var j = 0; j < authorsJoined.length; j++) {
                        if (authorsJoined[j].ISBN == response[i].ISBN) {
                            authorsArr.push(authorsJoined[j].name)
                        }
                    }
                    response[i].authors = authorsArr
                }
                var bestsellers = new Array()
                for (var i = 0; i < bestsellersISBN.length; i++) {
                    for (var j = 0; j < response.length; j++) {
                        if (bestsellersISBN[i].ISBN == response[j].ISBN) {
                            bestsellers.push(response[j])
                        }
                    }
                }
                return bestsellers
            })
        })
    })
};

/**
 * Deletes a book
 * 
 *
 * ISBN String Book ISBN to delete
 * no response value expected for this operation
 **/
exports.deleteBook = function(ISBN) {
    return sqlDb('book').where('ISBN', ISBN).del().then(function(response) {
        return sqlDb('writtenBy').where('ISBN', ISBN).del()
    })
}

/**
 * Finds Books from the params provided

 * Genres to filter by
 * Themes to filter by
 * returns List
 **/
exports.findBooksBy = function(genres, themes) {
    return sqlDb.from('author AS a').join('writtenBy AS wb', 'wb.authorID', 'a.authorID').then(function(response) {
        var authorsJoined = response;
        if (genres !== undefined && themes !== undefined) {
            return sqlDb('book').whereIn('genre', genres).andWhere(function() { this.whereIn('theme', themes) }).then(function(response) {
                for (var i = 0; i < response.length; i++) {
                    var authorsArr = new Array()
                    for (var j = 0; j < authorsJoined.length; j++) {
                        if (authorsJoined[j].ISBN == response[i].ISBN) {
                            authorsArr.push(authorsJoined[j].name)
                        }
                    }
                    response[i].authors = authorsArr
                }
                return response
            })
        }
        if (themes !== undefined) {
            return sqlDb('book').whereIn('theme', themes).then(function(response) {
                for (var i = 0; i < response.length; i++) {
                    var authorsArr = new Array()
                    for (var j = 0; j < authorsJoined.length; j++) {
                        if (authorsJoined[j].ISBN == response[i].ISBN) {
                            authorsArr.push(authorsJoined[j].name)
                        }
                    }
                    response[i].authors = authorsArr
                }
                return response
            })
        }
        if (genres !== undefined) {
            return sqlDb('book').whereIn('genre', genres).then(function(response) {
                for (var i = 0; i < response.length; i++) {
                    var authorsArr = new Array()
                    for (var j = 0; j < authorsJoined.length; j++) {
                        if (authorsJoined[j].ISBN == response[i].ISBN) {
                            authorsArr.push(authorsJoined[j].name)
                        }
                    }
                    response[i].authors = authorsArr
                }
                return response
            })
        }
        return sqlDb('book').then(function(response) {
            for (var i = 0; i < response.length; i++) {
                var authorsArr = new Array()
                for (var j = 0; j < authorsJoined.length; j++) {
                    if (authorsJoined[j].ISBN == response[i].ISBN) {
                        authorsArr.push(authorsJoined[j].name)
                    }
                }
                response[i].authors = authorsArr
            }
            return response
        })
    })
}


/**
 * Finds Book by name
 *
 * name List Name value that needs to be considered for filter
 * returns List
 **/
exports.findBooksByName = function(name) {
    if (name[0] == undefined) {
        return sqlDb('book').where('ISBN', "-1")
    } else return sqlDb.from('author AS a').join('writtenBy AS wb', 'wb.authorID', 'a.authorID').then(function(response) {
        var authorsJoined = response;
        return sqlDb('book').whereRaw('LOWER(name) LIKE ?', '%' + name[0].toLowerCase() + '%').then(function(response) {
            for (var i = 0; i < response.length; i++) {
                var authorsArr = new Array()
                for (var j = 0; j < authorsJoined.length; j++) {
                    if (authorsJoined[j].ISBN == response[i].ISBN) {
                        authorsArr.push(authorsJoined[j].name)
                    }
                }
                response[i].authors = authorsArr
            }
            return response
        })
    })
};

/**
 * Finds Books by author
 *
 * authors List Authors ID to filter by
 * returns List
 **/
exports.findBooksByAuthors = function(author) {
    if (author[0] == undefined) {
        return sqlDb('book').where('ISBN', "-1")
    } else return sqlDb.from('author AS a').join('writtenBy AS wb', 'wb.authorID', 'a.authorID').whereRaw('LOWER(name) LIKE ?', '%' + author[0].toLowerCase() + '%').then(function(response) {
        var isbnArr = new Array()
        for (var k = 0; k < response.length; k++) {
            isbnArr.push(response[k].ISBN)
        }
        return sqlDb.from('author AS a').join('writtenBy AS wb', 'wb.authorID', 'a.authorID').then(function(response) {
            var authorsJoined = response;
            return sqlDb('book').whereIn('ISBN', isbnArr).then(function(response) {
                for (var i = 0; i < response.length; i++) {
                    var authorsArr = new Array()
                    for (var j = 0; j < authorsJoined.length; j++) {
                        if (authorsJoined[j].ISBN == response[i].ISBN) {
                            authorsArr.push(authorsJoined[j].name)
                        }
                    }
                    response[i].authors = authorsArr
                }
                return response
            })
        })
    });
}

/**
 * Find book by ISBN
 * Returns a single book
 *
 * ISBN String ISBN of the book to return
 * returns Book
 **/
exports.getBookByISBN = function(ISBN) {
    return sqlDb.from('author AS a').join('writtenBy AS wb', 'wb.authorID', 'a.authorID').then(function(response) {
        var authorsJoined = response;
        return sqlDb('book').where('ISBN', ISBN).then(function(response) {
            for (var i = 0; i < response.length; i++) {
                var authorsArr = new Array()
                for (var j = 0; j < authorsJoined.length; j++) {
                    if (authorsJoined[j].ISBN == response[i].ISBN) {
                        authorsArr.push(authorsJoined[j].name)
                    }
                }
                response[i].authors = authorsArr
            }
            return response
        })
    })
};