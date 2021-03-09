// CLEARDB - heroku hosted mysql: ==========================
// DATABASE_URL: mysql://b5d6d955bdd21c:d3d09503@us-cdbr-east-03.cleardb.com/heroku_2aa3af37536720a?reconnect=true

const mysql = require("mysql");

const connection = mysql.createPool({
  host: "us-cdbr-east-03.cleardb.com",
  user: "b5d6d955bdd21c",
  password: "d3d09503",
  database: "heroku_2aa3af37536720a",
});

// connection.connect((error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(`=== Successfully connected to heroku - cleardb: ===`);
//   }
// });

module.exports = connection;
