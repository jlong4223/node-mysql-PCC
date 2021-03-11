const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mailer = require("./controllers/mailer");

// databases ===================
// ===> local mysql
require("./config/db-config");

// ===> Heroku ClearDB
require("./config/clear-db");

// imported routes
const homeRoute = require("./routes/welcome");
const authRoute = require("./routes/auth");
const eventsRoute = require("./routes/events");
// const mailRoute = require("./routes/mailer");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors());

// routes being used
app.use("/", homeRoute);
app.use("/", authRoute);
app.use("/", eventsRoute);
// app.use("/", mailRoute);
app.post("/send", mailer.sendMessage);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
