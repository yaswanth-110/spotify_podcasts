const express = require("express");

const router = express.Router();

const User = require("../models/user");

const { body, validationResult } = require("express-validator");

const authController = require("../controllers/auth");

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("This email is already in use");
          }
        });
      }),
    body("password", "please enter a valid password")
      .trim()
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("name").trim().not().isEmpty(),
    body("username").trim().not().isEmpty(),
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
