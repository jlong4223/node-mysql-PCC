const express = require("express");
const router = express.Router();
const eventsCtrl = require("../controllers/events");

router.get("/events", eventsCtrl.getAll);

module.exports = router;
