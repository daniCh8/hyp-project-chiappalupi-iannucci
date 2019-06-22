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
                table.text("name");
                table.enum("theme", ["love", "death", "good vs. evil", "coming of age", "power and corruption", "survival", "courage and heroism", "prejudice", "individual vs. society", "war"]);
                table.enum("genre", ["fantasy", "science fiction", "westerns", "romance", "thriller", "mystery", "detective story", "dystopya", "memoir", "biography", "play", "musical", "satire", "haiku", "horror", "DIY", "dictionary", "young adult fiction", "children book", "adult literature"]);
                table.enum("status", ["available", "out of stock"]);
                table.text("pictureURL");
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
        "pictureURL": body.pictureURL
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

 * Authors name to filter by
 * Genres to filter by
 * Themes to filter by
 * returns List
 **/
exports.findBooksBy = function(genres, themes) {
    if(genres !== undefined && themes !== undefined) {
      return sqlDb('book').whereIn('genre', genres)/*.WhereIn('theme', themes)*/.andWhere(function() { this.whereIn('theme', themes) })
    }
    if(themes !== undefined) {
      return sqlDb('book').whereIn('theme', themes)
    }
    return sqlDb('book').whereIn('genre', genres)
}


/**
 * Finds Book by name
 *
 * name List Name values that need to be considered for filter
 * returns List
 **/
exports.findBooksByName = function(name) {
    return sqlDb.from('author AS a').join('writtenBy AS wb', 'wb.authorID', 'a.authorID').then(function(response) {
        var authorsJoined = response;
        return sqlDb('book').where((builder) => builder.whereIn('name', name)).then(function(response) {
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

/*Example
exports.findBooksByName = function(name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "photoUrls" : [ "photoUrls", "photoUrls" ],
  "ISBN" : "9780330508117",
  "name" : "The Hitchhiker's Guide to the Galaxy",
  "genre" : "science fiction",
  "theme" : "love",
  "authors" : [ "01", "01" ]
}, {
  "photoUrls" : [ "photoUrls", "photoUrls" ],
  "ISBN" : "9780330508117",
  "name" : "The Hitchhiker's Guide to the Galaxy",
  "genre" : "science fiction",
  "theme" : "love",
  "authors" : [ "01", "01" ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}*/


/**
 * Finds Books by author
 *
 * authors List Authors ID to filter by
 * returns List
 **/
exports.findBooksByAuthors = function(author) {
    return sqlDb.from('author AS a').join('writtenBy AS wb', 'wb.authorID', 'a.authorID').whereIn('a.name', author).then(function(response) {
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

/* Example
exports.findBooksByAuthors = function(authors) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "photoUrls" : [ "photoUrls", "photoUrls" ],
  "ISBN" : "9780330508117",
  "name" : "The Hitchhiker's Guide to the Galaxy",
  "genre" : "science fiction",
  "theme" : "love",
  "authors" : [ "01", "01" ]
}, {
  "photoUrls" : [ "photoUrls", "photoUrls" ],
  "ISBN" : "9780330508117",
  "name" : "The Hitchhiker's Guide to the Galaxy",
  "genre" : "science fiction",
  "theme" : "love",
  "authors" : [ "01", "01" ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}*/


/**
 * Finds Books by themes
 *
 * themes List Themes to filter by
 * returns List
 **/
exports.findBooksByThemes = function(theme) {
    return sqlDb.from('author AS a').join('writtenBy AS wb', 'wb.authorID', 'a.authorID').then(function(response) {
        var authorsJoined = response;
        return sqlDb('book').where((builder) => builder.whereIn('theme', theme)).then(function(response) {
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

/*Example
exports.findBooksByThemes = function(themes) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "photoUrls" : [ "photoUrls", "photoUrls" ],
  "ISBN" : "9780330508117",
  "name" : "The Hitchhiker's Guide to the Galaxy",
  "genre" : "science fiction",
  "theme" : "love",
  "authors" : [ "01", "01" ]
}, {
  "photoUrls" : [ "photoUrls", "photoUrls" ],
  "ISBN" : "9780330508117",
  "name" : "The Hitchhiker's Guide to the Galaxy",
  "genre" : "science fiction",
  "theme" : "love",
  "authors" : [ "01", "01" ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}*/


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

/* Example
exports.getBookByISBN = function(iSBN) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "photoUrls" : [ "photoUrls", "photoUrls" ],
  "ISBN" : "9780330508117",
  "name" : "The Hitchhiker's Guide to the Galaxy",
  "genre" : "science fiction",
  "theme" : "love",
  "authors" : [ "01", "01" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}*/


/**
 * uploads an image
 * 
 *
 * ISBN String ISBN of book to update
 * additionalMetadata String Additional data to pass to server (optional)
 * file File file to upload (optional)
 * returns ApiResponse
 **/
exports.uploadFile = function(ISBN, additionalMetadata, file) {
    return new Promise(function(resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "code": 0,
            "type": "type",
            "message": "message"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}