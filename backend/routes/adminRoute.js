const express = require("express");
const { getAllUsers } = require("../controllers/adminController");
const { verifyAccessToken } = require("../helpers/jwt_helper");
const roleCheck = require("../middlewares/roleCheck");

const router = express.Router();

router.route("/get-users").get(verifyAccessToken, roleCheck(["admin"]), getAllUsers);

module.exports = router;
