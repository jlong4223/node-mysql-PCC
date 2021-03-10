const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

let mailOptions = {
  from: "jlong4223@gmail.com",
  to: "jlong4223@gmail.com",
  subject: "PC-api",
  text: "hi from the project",
};

transporter.sendMail(mailOptions, function (err, data) {
  err ? console.log("error: " + err) : console.log("message sent");
});

// TODO create route and export to server
