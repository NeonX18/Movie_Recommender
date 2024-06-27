const express = require("express");
const router = express.Router();

const {
  getNewRefreshToken,
  deleteRefreshToken,
} = require("../controllers/refreshTokenController");

router.route("/").get(getNewRefreshToken);
router.route("/").delete(deleteRefreshToken);

module.exports = router;
