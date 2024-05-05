const Podcast = require("../models/podcastDetails");

exports.addPodcast = async (req, res, next) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const speaker = req.body.speaker;
    const file = req.file;
    console.log(file);
    if (!file) {
      const error = new Error("No file is uploaded");
      error.statusCode = 422;
      throw error;
    }
    let fileUrl;
    if (req.file) {
      fileUrl = req.file.path.replace("\\", "/");
    }
    console.log("File URL" + fileUrl);

    const podcast = new Podcast({
      podcastName: name,
      description: description,
      category: category,
      speaker: speaker,
      thumbnailUrl: " ",
      fileUrl: fileUrl,
    });

    await podcast.save();
    res.status(200).json({ message: "post uploaded successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
