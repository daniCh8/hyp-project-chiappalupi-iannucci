"use strict";

let sqlDb;

exports.userDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if user table exists");
  return database.schema.hasTable("user").then(exists => {
    if (!exists) {
      console.log("The table doesn't exists: creating it.");
      return database.schema.createTable("user", table => {
        table.text("username");
        table.text("firstName");
        table.text("lastName");
        table.text("email");
        table.text("password");
        table.text("favouriteGeneres");
      });
    }
  });
};

//toDo examples, some methods, tests

/**
 * Create user
 * This can only be done by the logged in user.
 *
 * body User Created user object
 * no response value expected for this operation
 **/
exports.createUser = function(body) {
  return sqlDb('user')
         .insert(body);
}


/**
 * Creates list of users with given input array
 * 
 *
 * body List List of user object
 * no response value expected for this operation
 **/
exports.createUsersWithArrayInput = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Creates list of users with given input array
 * 
 *
 * body List List of user object
 * no response value expected for this operation
 **/
exports.createUsersWithListInput = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * username String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = function(username) {
  return sqlDb('user')
         .where('username', username)
         .del()
}


/**
 * Get user by user name
 * 
 *
 * username String The name that needs to be fetched. Use user1 for testing. 
 * returns User
 **/
 exports.getUserByName = function(username) {
  return sqlDb('user')
          .where('username', username)
 }

 /*Example
exports.getUserByName = function(username) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "Daniele",
  "lastName" : "Chiappalupi",
  "password" : "barbagianni",
  "favouriteGeneres" : "[fantasy, science fiction]",
  "email" : "daniele.chiappalupi@mail.polimi.it",
  "username" : "daniCh"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logs user into the system
 * 
 *
 * username String The username for login
 * password String The password for login
 * returns String
 **/
exports.loginUser = function(username,password) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logs out current logged in user session
 * 
 *
 * no response value expected for this operation
 **/
exports.logoutUser = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}