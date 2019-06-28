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
        var username = response[0].username
        return sqlDb('cart').where('username', username)
    })
}

/**
 * Add a new order to the cart
 *
 * body it's the order object to add
 * id it's the id of the request
 **/
exports.addOrder = function(body, id) {
    return sqlDb('session').where('id', id).then(function(response) {
        var username = response[0].username
            var cartObj = {
                "ISBN": body.ISBN,
                "shop": body.shop,
                "username": username,
                "quantity": body.quantity
            }
            return sqlDb('cart').insert(cartObj)
    })
}

/**
 * Checks if a book is in the cart
 *
 * ISBN it's the ISBN of the book to check
 * id it's the id of the request
 **/
exports.checkISBNInCart = function(ISBN, id) {
    return sqlDb('session').where('id', id).then(function(response) {
        var username = response[0].username
        return sqlDb('cart').where('username', username).andWhere('ISBN', ISBN)
    })
}

/**
 * Delete an order from the cart
 *
 * ISBN it's the ISBN of the book to check
 * id it's the id of the request
 **/
exports.deleteOrder = function(ISBN, id) {
    return sqlDb('session').where('id', id).then(function(response) {
        var username = response[0].username
        return sqlDb('cart').where('username', username).andWhere('ISBN', ISBN).del()
    })
}

/**
 * Clears the cart of the user
 *
 * id it's the id of the request
 **/
exports.clearCart = function(id) {
    return sqlDb('session').where('id', id).then(function(response) {
        var username = response[0].username
        return sqlDb('cart').where('username', username).del()
    })
}

/**
 * Updates the quantity of a book in the cart
 *
 * id it's the id of the request
 * ISBN it's the ISBN of the book to update
 * quantity it's the new quantity of the book
 **/
exports.updateQuantity = function(ISBN, quantity, id) {
    return sqlDb('session').where('id', id).then(function(response) {
        var username = response[0].username
        return sqlDb('cart').where('username', username).andWhere('ISBN', ISBN).update('quantity', quantity)
    })
}