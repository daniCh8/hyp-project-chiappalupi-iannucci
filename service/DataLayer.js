const sqlDbFactory = require("knex");
let { bookDbSetup } = require("./BookService");
let { writtenByDbSetup } = require("./BookService");
let { eventDbSetup } = require("./EventService");
let { userDbSetup } = require("./UserService");
let { authorDbSetup } = require("./AuthorService");
let { cartDbSetup } = require("./CartService");
let { sessionDbSetup } = require("./UserService");
let { orderHistoryDbSetup } = require("./CartService");
let { ssantaDbSetup } = require("./SecretsantaService");

let sqlDb = sqlDbFactory({
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://wydrsortvwnkgf:1d6381fc83ba0187540eb1b41a57b3935e5489380b7609a062ac63a91ad95007@ec2-54-246-98-119.eu-west-1.compute.amazonaws.com:5432/d9nd5vbtop8gsl?ssl=true',  
  ssl: true,
});

function setupDataLayer() {
  console.log("Setting up data layer");
  return bookDbSetup(sqlDb) && writtenByDbSetup(sqlDb) && eventDbSetup(sqlDb) && userDbSetup(sqlDb) && authorDbSetup(sqlDb) && cartDbSetup(sqlDb) && sessionDbSetup(sqlDb) && orderHistoryDbSetup(sqlDb) && ssantaDbSetup(sqlDb);
}

module.exports = { database: sqlDb, setupDataLayer };