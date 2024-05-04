const User = require("../models/user");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashPassword,
      username: username,
      isAdmin: false,
    });
    const userDoc = await user.save();
    res.status(200).json({
      message: "user account created successfully",
      userId: userDoc._id,
    });
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("A user with this email could not found ");
      error.statusCode = 401;
      throw error;
    }
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
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.adminLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("A user with this email could not found ");
      error.statusCode = 401;
      throw error;
    }
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
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.log(err);
    next();
  }
};
