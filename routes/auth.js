const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

router.post("/signup", authController.signup);

router.post("/admin/login", authController.adminLogin);

router.post("/user/login", authController.userLogin);

module.exports = router;
