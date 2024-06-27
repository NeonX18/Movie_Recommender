const express = require("express");

// const { verifyAccessToken } = require("../helpers/jwt_helper");
const semanticSearchResults = require("../controllers/plotSearchController");
const fuzzySearchResults = require("../controllers/fuzzySearchController");

const router = express.Router();

router.route("/plot").get(semanticSearchResults);
router.route("/title").get(fuzzySearchResults);

module.exports = router;
