const sql = require("../config/db-config");

const Bio = function (bioInfo) {
  this.bio = bioInfo.bio;
};

Bio.create = (newBio, userID, results) => {
  sql.query(
    "INSERT INTO user SET ? WHERE id = ?",
    newBio,
    userID,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created bio: ", { id: res.insertId, ...newbio });
      result(null, { id: res.insertId, ...newBio });
    }
  );
};

// find the id first - query that, than do another query to insert into it like register but max has to be 1 email >0 && =1
