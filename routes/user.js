const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

router.get("/podcasts", userController.getPodcasts);

router.post("/podcast/:podcastId", userController.getPodcast);

router.post("/podcasts/:podcastId", userController.addPodToFav);

router.get("/fav-podcast", userController.getFavPodcasts);

router.post("/podcasts/:podParam", userController.searchPodcast);

module.exports = router;
