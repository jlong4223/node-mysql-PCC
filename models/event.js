const sql = require("../config/db-config");

const Event = function (customer) {
  this.title = customer.title;
  this.start = customer.start;
  this.end = customer.end;
};

Event.create = (newEvent, result) => {
  sql.query("INSERT INTO events SET ?", newEvent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created event: ", { id: res.insertId, ...newEvent });
    result(null, { id: res.insertId, ...newEvent });
  });
};

module.exports = Event;
