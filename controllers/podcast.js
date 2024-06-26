const Podcast = require("../models/podcastDetails.js");

const FavPodcast = require("../models/favouriteSchema.js");

//GET ALL PODCASTS

exports.getPodcasts = async (req, res, next) => {
  try {
    const number = req.params.number;
    const SIZE_LIMIT = 10;
    const podcasts = await Podcast.find()
      .skip((number - 1) * SIZE_LIMIT)
      .limit(SIZE_LIMIT);
    if (podcasts.length === 0) {
      return res.status(400).json({ message: "No Podcasts are available" });
    }
    res
      .status(200)
      .json({ message: "Podcasts retrieved successfully", podcasts: podcasts });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

//GET SINGLE PODCAST

exports.getPodcast = async (req, res, next) => {
  try {
    const podcastId = req.params.podcastId;
    const podcast = await Podcast.findById(podcastId);
    if (!podcast) {
      const error = new Error("Podcast is not available");
      error.statusCode = 400;
      throw error;
    }
    res
      .status(200)
      .json({ message: "podcast retrieved successfully", podcast: podcast });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//ADD PODCAST TO FAVOURITE

exports.addPodToFav = async (req, res, next) => {
  try {
    const podcastId = req.params.podcastId;
    const userId = req.userId;
    const favPodcast = new FavPodcast({
      user: userId,
      podcast: podcastId,
    });
    await favPodcast.save();
    res
      .status(200)
      .json({ message: "podcast added to favourites successfully" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

//GET FAVOURITE PODCASTS

exports.getFavPodcasts = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await FavPodcast.find({ user: userId }).populate("podcast");
    if (user) {
      return res.status(200).json({
        message: "Favourite podcasts retrieved successfully",
        user: user,
      });
    } else {
      return res
        .status(400)
        .json({ message: "No favourites podcasts are available" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

//SEARCH A PODCAST BY NAME

exports.searchPodcast = async (req, res, next) => {
  try {
    const podcastparam = req.params.podParam;
    const podcasts = await Podcast.find({
      podcastName: { $regex: `${podcastparam}`, $options: "i" },
    });
    if (!podcasts) {
      const error = new Error("No podcasts are available with this name");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({
      message: "Podcasts with name retrieved successfully",
      podcasts: podcasts,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

//VIEWS COUNT

exports.increaseViewCount = async (req, res, next) => {
  try {
    const podcastId = req.params.podcastId;
    const podcast = await Podcast.findById(podcastId);
    if (!podcast) {
      return res.status(400).json({ message: "Podcast is not available" });
    }
    podcast.views += 1;
    await podcast.save();
    res.status(200).json({ message: "viewcount increased", podcast: podcast });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

//GET TRENDING PODCASTS

exports.getTrendingPodcasts = async (req, res, next) => {
  try {
    const number = req.params.number;
    const SIZE_LIMIT = 10;
    const podcasts = await Podcast.find()
      .sort({ views: -1 })
      .skip((number - 1) * SIZE_LIMIT)
      .limit(SIZE_LIMIT);
    if (podcasts.length === 0) {
      return res.status(400).json({ message: "No Podcasts are available" });
    }
    res
      .status(200)
      .json({ message: "Podcasts retrieved successfully", podcasts: podcasts });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// DELETE PODCAST FROM FAVOURITES

exports.delPodFromFav = async (req, res, next) => {
  try {
    const podcastId = req.params.podcastId;
    const userId = req.userId;
    const favPodcast = await FavPodcast.findOneAndDelete({
      user: userId,
      podcast: podcastId,
    });
    if (!favPodcast) {
      return res
        .status(400)
        .json({ message: "This podcast is not present in favourites" });
    }
    res
      .status(200)
      .json({ message: "podcast deleted successfully from favourites" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
