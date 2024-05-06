const express = require("express");

const router = express.Router();

const isAuth = require("../middlewares/isauth");

const userController = require("../controllers/podcast");

router.get("/podcasts/:number", userController.getPodcasts);

router.get("/podcast/:podcastId", isAuth, userController.getPodcast);

router.post("/podcasts/addToFav:podcastId", isAuth, userController.addPodToFav);

router.get("/fav-podcast", isAuth, userController.getFavPodcasts);

router.get("/podcasts/search/:podParam", isAuth, userController.searchPodcast);

module.exports = router;
