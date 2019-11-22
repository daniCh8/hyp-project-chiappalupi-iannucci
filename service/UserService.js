"use strict";

let sqlDb;
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");

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

exports.sessionDbSetup = function(database) {
    sqlDb = database;
    console.log("Checking if session table exists");
    return database.schema.hasTable("session").then(exists => {
        if (!exists) {
            console.log("The table SESSION doesn't exists: creating it.");
            return database.schema.createTable("session", table => {
                table.text("username");
                table.uuid("id");
            });
        }
    });
};

/**
 * Checks if the username exists
 **/
exports.checkUsernameAvailability = function(username) {
    return sqlDb('user').where('username', username)
}


/**
 * Login
 * Login with a form
 *
 * username String 
 * password String 
 * no response value expected for this operation
 **/
exports.userLogin = function(req, username, password) {
    return sqlDb('user').where('username', username).then(function(response) {
        if (response.length == 0) return false;
        if (response[0].username != username) return false;
        var check1 = CryptoJS.AES.decrypt(password, "Secret Passphrase");
        var check2 = CryptoJS.AES.decrypt(response[0].password, "Secret Passphrase");
        if (check1.toString() != check2.toString()) return false;
        var sessionObj = {
            "username": username,
            "id": req.session.id
        }
        return sqlDb('session').where('username', username).then(function(response) {
            if (response.length == 0) {
                return sqlDb('session').insert(sessionObj).then(function(response) {
                    return true
                })
            } else return sqlDb('session').where('username', username).update('id', sessionObj.id).then(function(response) {
                return true
            })
        })
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

exports.checkNameAvailability = function(paramfirstName, paramlastName) {
    return sqlDb('user').where({firstName: paramfirstName, lastName: paramlastName})
}

/**
 * Get user
 * Returns the user logged in
 *
 * body id it's the id of the user
 **/
exports.getUser = function(id) {
    return sqlDb('session').where('id', id).then(function(response) {
        var username = response[0].username
        return sqlDb('user').where('username', username)
    })
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
 * Does nothing
 */
exports.userLogout = function(id) {
    resolve()
}

/**
 * Checks if the session has expired
 */
exports.checkUserSession = function(id) {
    return sqlDb('session').where('id', id)
}