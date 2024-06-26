const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
