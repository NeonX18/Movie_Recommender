const createError = require("http-errors");
const User = require("../models/userModel");
const UserRoles = require("../models/userRoleModel");
const expressAsyncHandler = require("express-async-handler");

const roleCheck = (roles) => {
  return expressAsyncHandler(async (req, res, next) => {
    // roles.push("tier4");
    const { id } = req.payload;
    req.user = await User.findById(id).select("-password");

    if (!req.user) {
      throw createError.NotFound();
    }

    const role = await UserRoles.findOne({ UserId: id });

    if (!role) {
      throw createError.Unauthorized();
    }

    req.user.roles = role.Role;

    // checking if req.user.roles have the role required

    if (!req.user.roles.includes(...roles)) {
      throw createError.Unauthorized();
    }
    next();
  });
};

module.exports = roleCheck;
