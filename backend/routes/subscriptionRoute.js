const express = require("express");
const { updateUserRole } = require("../controllers/subscriptionController");
const { verifyAccessToken } = require("../helpers/jwt_helper");


const router = express.Router();

router.route("/updateRole").put(verifyAccessToken, updateUserRole);

module.exports = router;
