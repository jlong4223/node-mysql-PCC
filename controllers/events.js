const db = require("../config/db-config");

exports.getAll = (req, res) => {
  db.query("SELECT * FROM events", (err, data) => {
    err ? console.log(err) : res.json(data);
  });
};

// TODO create, delete, getById
