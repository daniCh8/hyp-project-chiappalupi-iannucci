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
 * Delete a reservation
 * 
 *
 * ID String ID of the reservation to delete
 * ISBN String ISBN of the book of the reservation to delete
 * no response value expected for this operation
 **/
exports.deleteReservation = function(ID,ISBN) {
    return sqlDb('reservation')
         .where({
          reservationID: ID,
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
 * Find a reservation by its ID
 * Returns a reservation
 *
 * ID String ID of the reservation to find
 * returns Reservation
 **/
 exports.getReservationByID = function(ID) {
  return sqlDb('book')
         .where('reservationID', ID)
 }

 /*Example
exports.getReservationByID = function(iD) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "shop" : "La Feltrinelli",
  "quantity" : 8,
  "ISBN" : "9780330508117",
  "ID" : "42",
  "user" : "daniCh"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}*/


/**
 * Find the reservations of an user by its username
 * Returns a list of reservations
 *
 * username String Username of the user to find reservation
 * returns List
 **/
 exports.getReservationsByUsername = function(username) {
  return sqlDb('reservation')
         .where('username', username)
 }

 /*Example
exports.getReservationsByUsername = function(username) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "shop" : "La Feltrinelli",
  "quantity" : 8,
  "ISBN" : "9780330508117",
  "ID" : "42",
  "user" : "daniCh"
}, {
  "shop" : "La Feltrinelli",
  "quantity" : 8,
  "ISBN" : "9780330508117",
  "ID" : "42",
  "user" : "daniCh"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}*/


/**
 * Update a reservation
 * 
 *
 * ID String ID of the reservation to update
 * ISBN String ISBN of the book of the reservation to update
 * quantity Integer Updated quantity of the book reserved
 * no response value expected for this operation
 **/
exports.updateReservationBookQuantity = function(ID,ISBN,quantity) {
  return sqlDb('reservation')
         .where({
          reservationID: ID,
          ISBN: ISBN
         })
  .update({
    quantity: 'quantity'
  })
}

