const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./config/db-config");

// imported routes
const homeRoute = require("./routes/welcome");
const authRoute = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors());

// routes being used
app.use("/", homeRoute);
app.use("/", authRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
