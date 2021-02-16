const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();

// imported routes
const homeRoute = require("./routes/welcome");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors());

// routes being used
app.use("/", homeRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
