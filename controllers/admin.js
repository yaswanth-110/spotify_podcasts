const Podcast = require("../models/podcastDetails");

exports.addPodcast = async (req, res, next) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const speaker = req.body.speaker;
    const file = req.file;
    if (!file) {
      const error = new Error("No file is uploaded");
      error.statusCode = 422;
      throw error;
    }
    const fileUrl = req.file.path("\\", "/");

    const podcast = new Podcast({
      podcastName: name,
      description: description,
      category: category,
      speaker: speaker,
      thumbnailUrl: "",
      file: fileUrl,
    });

    await podcast.save();
    res.status(200).json({ message: "post uploaded successfully" });
  } catch (err) {
    console.log(err);
  }
};
