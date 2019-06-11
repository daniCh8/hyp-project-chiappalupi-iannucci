"use strict";

let sqlDb;

exports.cartDbSetup = function(database) {
    sqlDb = database;
    console.log("Checking if cart table exists");
    return database.schema.hasTable("cart").then(exists => {
        if (!exists) {
            console.log("The table CART doesn't exists: creating it.");
            return database.schema.createTable("cart", table => {
                table.text("username");
                table.integer("reservationID");
                table.integer("sessionID");
            });
        }
    });
};


/**
 * View the content of the cart
 * Returns a list of reservations
 *
 * username String Username of the user to find the cart
 * returns List
 **/
exports.getCart = function(username) {
    return sqlDb('cart').where('username', username)
}