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
      isAdmin: "user",
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

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const isAdmin = req.query.isAdmin;
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("A user with this email could not found ");
      error.statusCode = 401;
      throw error;
    }
    if (user.isAdmin === isAdmin) {
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
    } else {
      res.status(401).json({ message: "Nor authorized" });
      const error = new Error("Not authorized");
      error.statusCode = 401;

      throw error;
    }
  } catch (err) {
    console.log(err);
    // next();
  }
};
