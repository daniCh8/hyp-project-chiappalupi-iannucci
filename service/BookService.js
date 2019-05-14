'use strict';


/**
 * Add a new book to the bookshop
 * 
 *
 * body Book Book object that needs to be added to the shop
 * no response value expected for this operation
 **/
exports.addBook = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Deletes a book
 * 
 *
 * iSBN String Book ISBN to delete
 * api_key String  (optional)
 * no response value expected for this operation
 **/
exports.deleteBook = function(iSBN,api_key) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Finds Book by name
 * Multiple name values can be provided with comma separated strings
 *
 * name List Name values that need to be considered for filter
 * returns List
 **/
exports.finBooksByName = function(name) {
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
}


/**
 * Finds Books by author
 * Muliple authors can be provided with comma separated strings.
 *
 * authors List Authors ID to filter by
 * returns List
 **/
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
}


/**
 * Finds Books by themes
 * Muliple books can be provided with comma separated strings.
 *
 * themes List Themes to filter by
 * returns List
 **/
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
}


/**
 * Find book by ISBN
 * Returns a single book
 *
 * iSBN String ISBN of the book to return
 * returns Book
 **/
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
}


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
 * iSBN String ISBN of book to update
 * additionalMetadata String Additional data to pass to server (optional)
 * file File file to upload (optional)
 * returns ApiResponse
 **/
exports.uploadFile = function(iSBN,additionalMetadata,file) {
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

