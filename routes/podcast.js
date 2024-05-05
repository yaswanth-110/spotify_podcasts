const express = require("express");

const router = express.Router();

const isAuth = require("../middlewares/isauth");

const userController = require("../controllers/podcast");

router.get("/podcasts", userController.getPodcasts);

router.post("/podcast/:podcastId", isAuth, userController.getPodcast);

router.post("/podcasts/:podcastId", isAuth, userController.addPodToFav);

router.get("/fav-podcast", isAuth, userController.getFavPodcasts);

router.post("/podcasts/:podParam", isAuth, userController.searchPodcast);

module.exports = router;
