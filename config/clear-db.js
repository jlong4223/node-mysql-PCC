// CLEARDB - heroku hosted mysql: ==========================
// DATABASE_URL: mysql://b5d6d955bdd21c:d3d09503@us-cdbr-east-03.cleardb.com/heroku_2aa3af37536720a?reconnect=true

const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createPool({
  host: "us-cdbr-east-03.cleardb.com",
  user: "b5d6d955bdd21c",
  password: process.env.HKDB_PASSWORD,
  database: "heroku_2aa3af37536720a",
});

module.exports = connection;
