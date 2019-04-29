'use strict';


/**
 * Add a new author to the database
 * 
 *
 * body Author Author object that needs to be added to the db
 * no response value expected for this operation
 **/
exports.addAuthor = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Deletes an author
 * 
 *
 * iD String Author object to delete
 * api_key String  (optional)
 * no response value expected for this operation
 **/
exports.deleteAuthor = function(iD,api_key) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find author by ID
 * Returns a single author
 *
 * iD String ID of the author to return
 * returns Author
 **/
exports.getBookByID = function(iD) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "birthday" : "11/03/1952",
  "name" : "Douglas Adams",
  "ID" : "42"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update an existing author
 * 
 *
 * body Author Author object that needs to be updated
 * no response value expected for this operation
 **/
exports.updateAuthor = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

