"use strict";

let sqlDb;

exports.eventDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if event table exists");
  return database.schema.hasTable("event").then(exists => {
    if (!exists) {
      console.log("The table EVENT doesn't exists: creating it.");
      return database.schema.createTable("event", table => {
        table.increments("eventID");
        table.text("ISBN");
        table.text("shop");
        table.text("address");
        table.text("city");
        table.text("pictureURL")
        table.date("date");
      });
    }
  });
};

//toDo examples, some methods, tests


/**
 * Get all the events in the database
 * Returns a list of events
 *
 * returns list of Event
 **/
exports.getEvents = function() {
  return sqlDb("event");
};


/**
 * Deletes an event
 * 
 *
 * ID Integer Event ID to delete
 * no response value expected for this operation
 **/
exports.deleteEvent = function(ID) {
  return sqlDb('event').where('eventID', ID).del()
}


/**
 * Add a new event to the bookshop
 * 
 *
 * body Event Event object that needs to be added to the shop
 * no response value expected for this operation
 **/
exports.addEvent = function(body) {
  return sqlDb('event').insert(body);
}


/**
 * Find an event by its ID
 * Returns an event
 *
 * ID String ID of the book presentated in the event to find
 * returns List
 **/
exports.getEventByID = function(ID) {
  return sqlDb('event').where('eventID', ID)
}


/**
 * Finds events by the ISBNs of the books presented in it
 * Returns the events where the books were presented
 *
 * ISBN String ISBN of the book presentated in the event to find
 * returns List
 **/
exports.getEventByISBN = function(ISBN) {
  return sqlDb('event').where('ISBN', ISBN)
}

/**
 * Finds events by the name of the shop where the book is presented
 * Returns the events in the shop selected
 *
 * shop String name of the shop to filter by
 * returns List
 **/
exports.getEventByShop = function(shop) {
  return sqlDb('event').whereRaw('LOWER(shop) LIKE ?', '%' + shop.toLowerCase() + '%')
}