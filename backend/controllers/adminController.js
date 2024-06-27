const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
// get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  if (!users) {
    res.status(404);
    throw new Error("No users found");
  }
  res.status(200).json({
    users,
  });
});


module.exports = {
  getAllUsers,
};
