const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  podcast: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Podcast",
  },
});

module.exports = mongoose.model("favouriteSchema", favouriteSchema);
