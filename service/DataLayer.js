const sqlDbFactory = require("knex");
let { bookDbSetup } = require("./BookService");
let { eventDbSetup } = require("./EventService");
let { userDbSetup } = require("./UserService");
let { authorDbSetup } = require("./AuthorService");
let { reservationDbSetup } = require("./ReservationService");

let sqlDb = sqlDbFactory({
  client: "pg",
  connection: process.env.DATABASE_URL,
  ssl: true,
  debug: true
});

function setupDataLayer() {
  console.log("Setting up data layer");
  return bookDbSetup(sqlDb) && writtenByDbSetup(sqlDb) && eventDbSetup(sqlDb) && userDbSetup(sqlDb) && authorDbSetup(sqlDb) && reservationDbSetup(sqlDb);
}

module.exports = { database: sqlDb, setupDataLayer };