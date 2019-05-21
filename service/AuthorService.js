"use strict";

let sqlDb;

exports.authorDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if author table exists");
  return database.schema.hasTable("author").then(exists => {
    if (!exists) {
      console.log("The table doesn't exists: creating it.");
      return database.schema.createTable("author", table => {
        table.increments("authorID");
        table.text("name");
        table.date("birthday");
      });
    }
  });
};

//toDo examples, some methods, tests

/**
 * Get all the authors in the database
 * Returns a list of authors
 *
 * returns list of Author
 **/
exports.getAuthors = function() {
  return sqlDb("author");
};

/**
 * Add a new author to the database
 * 
 *
 * body Author Author object that needs to be added to the db
 * no response value expected for this operation
 **/
exports.addAuthor = function(body) {
  return sqlDb('author')
         .insert(body);
}


/**
 * Deletes an author
 * 
 *
 * ID String Author object to delete
 * no response value expected for this operation
 **/
exports.deleteAuthor = function(ID) {
  return sqlDb('author')
         .where('authorID', ID)
         .del()
}


/**
 * Find author by ID
 * Returns a single author
 *
 * ID int ID of the author to return
 * returns Author
 **/
exports.getAuthorByID = function(ID) {
  return sqlDb('author')
         .where('authorID', ID)
}

/*Example
exports.getAuthorByID = function(ID) {
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
}*/


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

