const express = require("express");

const router = express.Router();

const isAuth = require("../middlewares/isauth");

const userController = require("../controllers/podcast");

router.get("/podcasts/:number", isAuth, userController.getPodcasts);

router.get("/podcast/:podcastId", isAuth, userController.getPodcast);

router.post(
  "/podcasts/addToFav/:podcastId",
  isAuth,
  userController.addPodToFav
);

router.post(
  "/podcasts/delFromFav/:podcastId",
  isAuth,
  userController.delPodFromFav
);

router.get("/fav-podcast", isAuth, userController.getFavPodcasts);

router.get("/podcasts/search/:podParam", isAuth, userController.searchPodcast);

router.post(
  "/podcasts/addView/:podcastId",
  isAuth,
  userController.increaseViewCount
);

router.get(
  "/podcasts/trendingPods/:number",
  isAuth,
  userController.getTrendingPodcasts
);

module.exports = router;
