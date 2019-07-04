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
                table.text("username");
                table.integer("quantity");
                table.float("cost");
            });
        }
    });
};

exports.orderHistoryDbSetup = function(database) {
    sqlDb = database;
    console.log("Checking if orderHistory table exists");
    return database.schema.hasTable("orderHistory").then(exists => {
        if (!exists) {
            console.log("The table ORDERHISTORY doesn't exists: creating it.");
            return database.schema.createTable("orderHistory", table => {
                table.increments("id");
                table.text("username");
                table.text("ISBN");
                table.date("date");
                table.float("cost");
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
        return sqlDb('cart').where('username', username).orderBy('ISBN')
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
        return sqlDb('book').where('ISBN', body.ISBN).then(function(response) {
            var cost = body.quantity * response[0].price;
            console.log(cost)
            var cartObj = {
                "ISBN": body.ISBN,
                "cost": cost,
                "username": username,
                "quantity": body.quantity
            }
            return sqlDb('cart').insert(cartObj)
        })
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
        return sqlDb('cart').where('username', username).andWhere('ISBN', ISBN).update('quantity', quantity).then(function(response) {
            return sqlDb('book').where('ISBN', ISBN).then(function(response) {
                var newCost = response[0].price * quantity
                return sqlDb('cart').where('username', username).andWhere('ISBN', ISBN).update('cost', newCost)
            })
        })
    })
}

/**
 * Checks if the cart is empty
 *
 * id it's the id of the request
 **/
exports.checkCart = function(id) {
    return sqlDb('session').where('id', id).then(function(response) {
        var username = response[0].username
        return sqlDb('cart').where('username', username)
    })
}

/**
 * Checkouts the books and adds them to the historical orders
 *
 * id it's the id of the request
 **/
exports.checkout = function(id) {
    return sqlDb('session').where('id', id).then(function(response) {
        var username = response[0].username
        return sqlDb('cart').where('username', username).then(function(response) {
            var today = new Date()
            var orders = new Array()
            for (var i = 0; i < response.length; i++) {
                var orderObj = {
                    "username": username,
                    "ISBN": response[i].ISBN,
                    "cost": response[i].cost,
                    "quantity": response[i].quantity,
                    "date": today
                }
                orders.push(orderObj)
            }
            return sqlDb('orderHistory').insert(orders).then(function() {
                return sqlDb('cart').where('username', username).del()
            })
        })
    })
}

/**
 * Checks the actual session
 */
exports.checkSession = function(id) {
    return sqlDb('session').where('id', id)
}