const User = require("../models/user");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

exports.signup = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const username = req.body.username;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("validation failed");
      error.statusCode = 400;
      error.data = errors.array();
      throw error;
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashPassword,
      name: name,
      username: username,
      userType: "user",
    });
    const userDoc = await user.save();
    res.status(200).json({
      message: "user account created successfully",
      userId: userDoc._id,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userType = req.query.userType;
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("A user with this email could not found ");
      error.statusCode = 401;
      throw error;
    }
    if (user.userType === userType) {
      const isPasswordEqual = await bcrypt.compare(password, user.password);
      if (!isPasswordEqual) {
        const error = new Error("Please enter a valid password");
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id.toString(),
        },
        "supersecretkey",
        { expiresIn: "2hr" }
      );
      res.status(200).json({
        token: token,
        userDetails: user,
        userType: user.userType,
      });
    } else {
      res.status(401).json({ message: "Not authorized" });
      const error = new Error("Not authorized");
      error.statusCode = 401;

      throw error;
    }
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
