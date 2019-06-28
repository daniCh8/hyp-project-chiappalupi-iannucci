"use strict";

let sqlDb;

exports.orderDbSetup = function(database) {
    sqlDb = database;
    console.log("Checking if order table exists");
    return database.schema.hasTable("order").then(exists => {
        if (!exists) {
            console.log("The table ORDER doesn't exists: creating it.");
            return database.schema.createTable("order", table => {
                table.increments("orderID");
                table.text("ISBN");
                table.text("shop");
                table.text("username");
                table.integer("quantity");
            });
        }
    });
};

//toDo examples, some methods, tests

/**
 * Adds an order
 * 
 *
 * body Order object that needs to be added to the database
 * no response value expected for this operation
 **/
exports.addOrder = function(body) {
    return sqlDb('order').insert(body).then(function(returnResponse) {
        return sqlDb('order').max('orderID').where('username', body.username).then(function(max) {
          var cartObj = {
              "username": body.username,
              "orderID": max[0].max,
              "sessionID": sessionID
          } 
          return sqlDb('cart').insert(cartObj).then(function() {return returnResponse})
          })
        })
}


/**
 * Delete a order
 * 
 *
 * ID String ID of the order to delete
 * ISBN String ISBN of the book of the order to delete
 * no response value expected for this operation
 **/
exports.deleteOrder = function(username, ISBN) {
    return sqlDb('order').max('orderID').where({
        username: username,
        ISBN: ISBN
    }).then(function(maxID) {
        return sqlDb('cart').where('username', username).andWhere('orderID', maxID[0].max).then(function(response) {
            if (response.length == 0) return 'This order doesn not exists!'
            return sqlDb('cart').where('username', username).andWhere('orderID', maxID[0].max).del().then(function(response) {
                return sqlDb('order').max('orderID').where({
                    username: username,
                    ISBN: ISBN
                }).del()
            })
        })
    })
}


/**
 * Delete all the orders of a user
 * 
 *
 * username String Username of the user of the orders to delete
 * no response value expected for this operation
 **/
exports.deleteUserOrders = function(username) {
    return sqlDb('order').where('username', username).del().then(function(response) {
        return sqlDb('cart').where('username', username).del()
    })
}


/**
 * Find the orders of an user by its username
 * Returns a list of orders
 *
 * username String Username of the user to find order
 * returns List
 **/
exports.getOrdersByUsername = function(username) {
    return sqlDb('order').where('username', username)
}


/**
 * Update a order
 * 
 *
 * ID String ID of the order to update
 * ISBN String ISBN of the book of the order to update
 * quantity Integer Updated quantity of the book reserved
 * no response value expected for this operation
 **/
exports.updateOrderBookQuantity = function(username, ISBN, quantity) {
    return sqlDb('order').where({
        username: username,
        ISBN: ISBN
    }).update({
        quantity: 'quantity'
    })
}