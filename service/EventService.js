"use strict";

let sqlDb;

exports.eventDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if event table exists");
  return database.schema.hasTable("event").then(exists => {
    if (!exists) {
      console.log("The table doesn't exists: creating it.");
      return database.schema.createTable("event", table => {
        table.increments("eventID");
        table.text("ISBN");
        table.text("shop");
        table.date("date");
      });
    }
  });
};

//toDo examples, some methods, tests


/**
 * Add a new event to the bookshop
 * 
 *
 * body Event Event object that needs to be added to the shop
 * no response value expected for this operation
 **/
exports.addEvent = function(body) {
  return sqlDb('event')
         .insert(body);
}


/**
 * Find an event by its ID
 * Returns an event
 *
 * ID String ID of the book presentated in the event to find
 * returns List
 **/
exports.getEventByID = function(ID) {
  return sqlDb('event')
         .where('eventID', ID)
}

/*Example
exports.getEventByID = function(ID) {
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
}*/


/**
 * Finds events by the ISBNs of the books presented in it
 * Returns the events where the books were presented
 *
 * ISBN String ISBN of the book presentated in the event to find
 * returns List
 **/
exports.getEventByISBN = function(ISBN) {
  return sqlDb('event')
         .where((builder) =>
          builder.whereIn('ISBN', ISBN))
}

 /*Example
exports.getEventByISBN = function(ISBN) {
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
}*/


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

