const mysql = require("mysql");
require("dotenv").config();

// local mysql
dbVars = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: process.env.DBPASSWORD,
  DB: "portchaveriat",
};

const connection = mysql.createConnection({
  host: dbVars.HOST,
  user: dbVars.USER,
  password: dbVars.PASSWORD,
  database: dbVars.DB,
});

connection.connect((error) => {
  let db = dbVars.DB;
  if (error) {
    console.log(error);
  } else {
    console.log(`===Successfully connected to mysql db: ${db}===`);
  }
});

module.exports = connection;
