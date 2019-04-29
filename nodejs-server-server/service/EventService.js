'use strict';


/**
 * Add a new event to the bookshop
 * 
 *
 * body Event Event object that needs to be added to the shop
 * no response value expected for this operation
 **/
exports.addEvent = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find an event by its ID
 * Returns an event
 *
 * iD String ID of the book presentated in the event to find
 * returns List
 **/
exports.getEventByID = function(iD) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "shop" : "La Feltrinelli",
  "ISBN" : "9780330508117",
  "ID" : "42"
}, {
  "shop" : "La Feltrinelli",
  "ISBN" : "9780330508117",
  "ID" : "42"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find an event by the ISBNs of the books presented in it
 * Returns the events where the books were presented
 *
 * iSBN String ISBN of the book presentated in the event to find
 * returns List
 **/
exports.getEventByISBN = function(iSBN) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "shop" : "La Feltrinelli",
  "ISBN" : "9780330508117",
  "ID" : "42"
}, {
  "shop" : "La Feltrinelli",
  "ISBN" : "9780330508117",
  "ID" : "42"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update an existing event
 * 
 *
 * body Event Event object that needs to be updated
 * no response value expected for this operation
 **/
exports.updateEvent = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

