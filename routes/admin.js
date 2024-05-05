const express = require("express");

const router = express.Router();

const adminRoutes = require("../controllers/admin");

router.post("/add-podcast", adminRoutes.addPodcast);

module.exports = router;
