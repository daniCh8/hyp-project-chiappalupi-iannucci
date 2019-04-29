'use strict';


/**
 * Add a new reservation to the database
 * 
 *
 * body Reservation Reservation object that needs to be added to the database
 * no response value expected for this operation
 **/
exports.addReservation = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a reservation
 * 
 *
 * iD String ID of the reservation to delete
 * iSBN String ISBN of the book of the reservation to delete
 * api_key String  (optional)
 * no response value expected for this operation
 **/
exports.deleteReservation = function(iD,iSBN,api_key) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete all the reservations of a user
 * 
 *
 * username String Username of the user of the reservations to delete
 * api_key String  (optional)
 * no response value expected for this operation
 **/
exports.deleteUserReservations = function(username,api_key) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find a reservation by its ID
 * Returns a reservation
 *
 * iD String ID of the reservation to find
 * returns Reservation
 **/
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
}


/**
 * Find the reservations of an user by its username
 * Returns a list of reservations
 *
 * username String Username of the user to find reservation
 * returns List
 **/
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
}


/**
 * Update an existing reservation
 * 
 *
 * body Reservation Reservation object that needs to be updated
 * no response value expected for this operation
 **/
exports.updateReservation = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update a reservation
 * 
 *
 * iD String ID of the reservation to update
 * iSBN String ISBN of the book of the reservation to update
 * quantity Integer Updated quantity of the book reserved
 * api_key String  (optional)
 * no response value expected for this operation
 **/
exports.updateReservationBookQuantity = function(iD,iSBN,quantity,api_key) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

