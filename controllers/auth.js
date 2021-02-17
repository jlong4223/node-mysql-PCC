const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const util = require("util");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DBPASSWORD,
  database: "portchaveriat",
});

exports.register = (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  const SALT_ROUNDS = 8;

  db.query(
    "SELECT email FROM user WHERE email = ?",
    [email],
    async (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        console.log(`${400}: email has been taken`);
        res.status(400);
        res.json({
          error: `${400}: email has been taken`,
        });
        return;
      } else if (password !== passwordConfirm) {
        console.log("passwords do not match");
        res.status(400);
        res.json({
          error: "passwords do not match",
        });
        return;
      }
      let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      console.log(hashedPassword);

      db.query(
        "INSERT INTO user SET ?",
        {
          name: name,
          email: email,
          password: hashedPassword,
        },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log("results: ", results);
            res.json({
              completed: results,
            });
          }
        },
      );
    },
  );
};
