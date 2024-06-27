const express = require("express");
const { getMoviesById, getMovies } = require("../controllers/movieController");

const router = express.Router();

router.route("/:id").get(getMoviesById);
router.route("/").get(getMovies);

module.exports = router;
