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

transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`=== Server is ready to take messages: ${success} ===`);
});

const sendMessage = (req, res, next) => {
  let mailOptions = {
    from: `${req.body.emailState.email}`,
    to: process.env.EMAIL,
    subject: `Message From: ${req.body.emailState.email}, within PortChaveriat`,
    text: `${req.body.emailState.email} says, ${req.body.message.message}`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    err
      ? res.json({
          status: "fail",
        })
      : res.json({
          status: "success",
        });
  });
};

module.exports = { sendMessage };
