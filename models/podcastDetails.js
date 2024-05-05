const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const podcastSchema = new Schema(
  {
    podcastName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["audio", "video"],
      required: true,
    },
    speaker: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Podcast", podcastSchema);
