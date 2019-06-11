"use strict";

let sqlDb;

exports.reservationDbSetup = function(database) {
    sqlDb = database;
    console.log("Checking if reservation table exists");
    return database.schema.hasTable("reservation").then(exists => {
        if (!exists) {
            console.log("The table RESERVATION doesn't exists: creating it.");
            return database.schema.createTable("reservation", table => {
                table.increments("reservationID");
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
 * Adds a reservation
 * 
 *
 * body Reservation object that needs to be added to the database
 * no response value expected for this operation
 **/
exports.addReservation = function(body) {
    return sqlDb('reservation')
        .insert(body)
}


/**
 * Delete a reservation
 * 
 *
 * ID String ID of the reservation to delete
 * ISBN String ISBN of the book of the reservation to delete
 * no response value expected for this operation
 **/
exports.deleteReservation = function(ID, ISBN) {
    return sqlDb('reservation')
        .where({
            username: username,
            ISBN: ISBN
        })
        .del()
}


/**
 * Delete all the reservations of a user
 * 
 *
 * username String Username of the user of the reservations to delete
 * no response value expected for this operation
 **/
exports.deleteUserReservations = function(username) {
    return sqlDb('reservation')
        .where('username', username)
        .del()
}


/**
 * Find the reservations of an user by its username
 * Returns a list of reservations
 *
 * username String Username of the user to find reservation
 * returns List
 **/
exports.getReservationsByUsername = function(username) {
    return sqlDb('reservation').max('reservationID').where('username', username).then(function(response) {
        return sqlDb('reservation').where('username', username).andWhere('reservationID', response[0].reservationID)
    })
}


/**
 * Update a reservation
 * 
 *
 * ID String ID of the reservation to update
 * ISBN String ISBN of the book of the reservation to update
 * quantity Integer Updated quantity of the book reserved
 * no response value expected for this operation
 **/
exports.updateReservationBookQuantity = function(username, ISBN, quantity) {
    return sqlDb('reservation').where({
        username: username,
        ISBN: ISBN
    }).update({
        quantity: 'quantity'
    })
}