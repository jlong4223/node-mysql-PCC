// const db = require("../config/db-config");
const db = require("../config/clear-db.js");
const Event = require("../models/event");

exports.getAll = (req, res) => {
  db.query("SELECT * FROM events", (err, data) => {
    err ? console.log(err) : res.json(data);
  });
};

// TODO delete, getById

exports.create = (req, res) => {
  !req.body
    ? res.status(400).send({ message: "Content can't be empty" })
    : res.status(200);

  const event = new Event({
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
  });

  Event.create(event, (err, data) => {
    err
      ? res.status(500).send({ message: err.message || "some err occured" })
      : res.send(data);
  });
};
