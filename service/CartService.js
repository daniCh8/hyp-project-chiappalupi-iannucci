"use strict";

let sqlDb;

exports.cartDbSetup = function(database) {
    sqlDb = database;
    console.log("Checking if cart table exists");
    return database.schema.hasTable("cart").then(exists => {
        if (!exists) {
            console.log("The table CART doesn't exists: creating it.");
            return database.schema.createTable("cart", table => {
                table.text("ISBN");
                table.text("shop");
                table.text("username");
                table.integer("quantity");
            });
        }
    });
};


/**
 * View the content of the cart
 * Returns a list of books
 *
 * req it's the request to get the parameters from
 * returns List
 **/
exports.getCart = function(req) {
    return sqlDb('session').where('id', req.session.id).then(function(response) {
        var username = response.username
        return sqlDb('cart').where('username', username)
    })
}

/**
 * Add a new reservation to the cart
 *
 * body it's the reservation object to add
 * id it's the id of the request
 **/
exports.addOrder = function(req) {
    return sqlDb('session').where('id', req.session.id).then(function(response) {
        var username = response.username
        return sqlDb('cart').where('username', username)
    })
}