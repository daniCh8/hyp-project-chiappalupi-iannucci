"use strict";

let sqlDb;

exports.userDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if user table exists");
  return database.schema.hasTable("user").then(exists => {
    if (!exists) {
      console.log("The table USER doesn't exists: creating it.");
      return database.schema.createTable("user", table => {
        table.text("username");
        table.text("firstName");
        table.text("lastName");
        table.text("email");
        table.text("password");
      });
    }
  });
};

//toDo examples, some methods, tests

/**
 * Login
 * Login with a form
 *
 * username String 
 * password String 
 * no response value expected for this operation
 **/
exports.userLogin = function(username,password) {
  return sqlDb('user').where('username', username).then(function(response) {
              var exists = false;
              if(response.length == 0) return false;
              if(response[0].username != username) return false;
              if(response[0].password != password) return false;
              return true;
          })
}


/**
 * Register
 * Register into the store
 *
 * body User 
 * no response value expected for this operation
 **/
exports.userRegister = function(body) {
  return sqlDb('user').insert(body);
}



/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * username String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = function(username) {
  return sqlDb('user').where('username', username).del()
}


/**
 * Get user by user name
 * 
 *
 * username String The name that needs to be fetched. Use user1 for testing. 
 * returns User
 **/
 exports.getUserByName = function(username) {
  return sqlDb('user').where('username', username)
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