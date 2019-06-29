"use strict";

let sqlDb;

exports.authorDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if author table exists");
  return database.schema.hasTable("author").then(exists => {
    if (!exists) {
      console.log("The table AUTHOR doesn't exists: creating it.");
      return database.schema.createTable("author", table => {
        table.increments("authorID");
        table.text("name");
        table.date("birthday");
        table.text("bio");
        table.text("pictureURL");
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
  return sqlDb("author").orderBy('authorID');
};

/**
 * Add a new author to the database
 * 
 *
 * body Author Author object that needs to be added to the db
 * no response value expected for this operation
 **/
exports.addAuthor = function(body) {
  return sqlDb('author').insert(body);
}


/**
 * Deletes an author
 * 
 *
 * ID String Author object to delete
 * no response value expected for this operation
 **/
exports.deleteAuthor = function(ID) {
  return sqlDb('author').where('authorID', ID).del()
}


/**
 * Find author by ID
 * Returns a single author
 *
 * ID int ID of the author to return
 * returns Author
 **/
exports.getAuthorByID = function(ID) {
  return sqlDb('author').where('authorID', ID)
}

/**
 * Finds Books by themes
 *
 * themes List Themes to filter by
 * returns List
 **/
exports.findAuthorsByName = function(names) {
  if(names == undefined) {
    return sqlDb('author').orderBy('authorID')
  }
  return sqlDb('author').whereRaw('LOWER(name) LIKE ?', '%' + names[0].toLowerCase() + '%')
};