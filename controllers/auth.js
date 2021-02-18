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

// TODO test the login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "No email or password",
      });
    }
    db.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      async (error, results) => {
        console.log(results);
        // there should only be one in the database so im using 0
        if (
          !results ||
          //  comparing given password with hashed password
          !(await bcrypt.compare(password, results[0].password))
        ) {
          res.status(401).json({
            message: "Email or Password is incorrect",
          });
        } else {
          const id = results[0].id;
          const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: "90d",
          });
          //   res.json({ token });
          console.log("the token is: " + token);

          const cookieOptions = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          };
          //   res.json({ token, email, password });
          res.cookie("jwt", token, cookieOptions);
          res.status(200);
        }
      },
    );
  } catch (error) {
    console.log(error);
  }
};
