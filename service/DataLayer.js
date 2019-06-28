const sqlDbFactory = require("knex");
let { bookDbSetup } = require("./BookService");
let { writtenByDbSetup } = require("./BookService");
let { eventDbSetup } = require("./EventService");
let { userDbSetup } = require("./UserService");
let { authorDbSetup } = require("./AuthorService");
let { cartDbSetup } = require("./CartService");
let { sessionDbSetup } = require("./UserService");
let { orderHistoryDbSetup } = require("./CartService");

let sqlDb = sqlDbFactory({
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://bqhchwqizhttah:3f305ede33477f67e825e9333d32580d8678ac9f55e67c7efde91104f25a3e93@ec2-79-125-4-72.eu-west-1.compute.amazonaws.com:5432/d6cfugvechp74j?ssl=true',  
  ssl: true,
});

function setupDataLayer() {
  console.log("Setting up data layer");
  return bookDbSetup(sqlDb) && writtenByDbSetup(sqlDb) && eventDbSetup(sqlDb) && userDbSetup(sqlDb) && authorDbSetup(sqlDb) && cartDbSetup(sqlDb) && sessionDbSetup(sqlDb) && orderHistoryDbSetup(sqlDb);
}

module.exports = { database: sqlDb, setupDataLayer };