"use strict";

let sqlDb;

exports.bookDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if book table exists");
  return database.schema.hasTable("book").then(exists => {
    if (!exists) {
      console.log("The table doesn't exists: creating it.");
      return database.schema.createTable("book", table => {
        table.text("ISBN");
        table.text("name");
        table.enum("theme", ["love", "death", "good vs. evil", "coming of age", "power and corruption", "survival", "courage and heroism", "prejudice", "individual vs. society", "war"]);
        table.enum("genre", ["fantasy", "science fiction", "westerns", "romance", "thriller", "mystery", "detective story", "dystopya", "memoir", "biography", "play", "musical", "satire", "haiku", "horror", "DIY", "dictionary", "young adult fiction", "children book", "adult literature"]);
        table.enum("status", ["available", "out of stock"]);
      });
    }
  });
};

exports.writtenByDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if book table exists");
  return database.schema.hasTable("writtenBy").then(exists => {
    if (!exists) {
      console.log("The table doesn't exists: creating it.");
      return database.schema.createTable("writtenBy", table => {
        table.text("ISBN");
        table.text("authorID");
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
  sqlDb.select('ISBN').from(Book).where('ISBN', body.ISBN).then(function (response) {
      if(response == body.ISBN)
        return console.log('Can not add object: This ISBN already exists');
    });
  var bookObj = {
    "ISBN": body.ISBN,
    "name": body.name,
    "theme": body.theme,
    "genre": body.genre,
    "status": body.status
  };
  var i;
  for (i = 0; i < body.authors; i++) {
    sqlDb('writtenBy')
    .insert({
      "ISBN": body.ISBN,
      "authorID": body.authors[author]
    }).then(function (response) {
      utils.writeJson(res, response);
    });
  };
  return sqlDb('book').insert(bookObj);
}

/**
 * Get all the books in the database
 * Returns a list of book
 *
 * returns list of Book
 **/
exports.getBooks = function() {
  return sqlDb
          .select()
          .from('book')
          .innerJoin('writtenBy', 'book.ISBN', 'writtenBy.ISBN')
          .innerJoin('author', 'author.authorID', 'writtenBy.authorID')
};

/**
 * Deletes a book
 * 
 *
 * ISBN String Book ISBN to delete
 * no response value expected for this operation
 **/
exports.deleteBook = function(ISBN) {
  return sqlDb('book')
         .where('ISBN', ISBN)
         .del()
}


/**
 * Finds Book by name
 * Multiple name values can be provided with comma separated strings
 *
 * name List Name values that need to be considered for filter
 * returns List
 **/
exports.findBooksByName = function(name) {
  return sqlDb('book')
         .where((builder) =>
          builder.whereIn('name', name)
          )};

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
 * Muliple authors can be provided with comma separated strings.
 *
 * authors List Authors ID to filter by
 * returns List
 **/
 exports.findBooksByAuthors = function(authors) {
  return sqlDb('book')
         .where((builder) =>
          builder.whereIn('author', authors)
)};

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
 * Muliple themes can be provided with comma separated strings.
 *
 * themes List Themes to filter by
 * returns List
 **/
exports.findBooksByThemes = function(themes) {
  return sqlDb('book')
         .where((builder) =>
          builder.whereIn('theme', themes)
          )};

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
  return sqlDb('book')
         .where('ISBN', ISBN)
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
 * Update an existing book
 * 
 *
 * body Book Book object that needs to be updated
 * no response value expected for this operation
 **/
exports.updateBook = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * uploads an image
 * 
 *
 * ISBN String ISBN of book to update
 * additionalMetadata String Additional data to pass to server (optional)
 * file File file to upload (optional)
 * returns ApiResponse
 **/
exports.uploadFile = function(ISBN,additionalMetadata,file) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "code" : 0,
  "type" : "type",
  "message" : "message"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

