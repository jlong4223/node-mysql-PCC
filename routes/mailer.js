const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/mailer");

router.post("/send", messageCtrl.sendMessage);

module.exports = router;
