const express = require("express");

const {
  updateUser,
  deleteUser,
  loginUser,
  registerUser,
  userProfile,
} = require("../controllers/userControllers");

const { verifyAccessToken } = require("../helpers/jwt_helper");

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

router
.route("/")
  .patch(verifyAccessToken, updateUser)
  .delete(verifyAccessToken, deleteUser)
  .get(verifyAccessToken, userProfile);

module.exports = router;
