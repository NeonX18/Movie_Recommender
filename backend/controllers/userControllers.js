const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const UserRole = require("../models/userRoleModel");
const {
  loginSchema,
  registerSchema,
  updateUserSchema,
  deleteUserSchema,
} = require("../middlewares/validation");
const generateToken = require("../helpers/generateToken");
const UserToken = require("../models/userTokenModel");
const tokenCookieOptions = require("../config/tokenCookieOptions");
const isSessionExists = require("../helpers/isSessionExists");
// Login user
// post request with email and password
// public access

const role2lblMap = {
  "tier4":"T4",
  "tier3":"T3",
  "tier2":"T2",
  "tier1":"T1",
  "admin":"A"
}

const loginUser = asyncHandler(async (req, res) => {
  // validating the body
  let result;
  try {
    result = await loginSchema.validateAsync(req.body);
  } catch (error) {
    if (error.isJoi === true) {
      throw createError.UnprocessableEntity(error.details[0].message);
    }
    throw createError.BadRequest();
  }

  // checking for user existance
  const { email, password } = result;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError.NotFound("User not found");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw createError.Unauthorized("Invalid Credentials");
  }

  const { accessToken, refreshToken } = await generateToken(user._id);
  if (!accessToken || !refreshToken) {
    throw createError.InternalServerError();
  }

  const userRole = await UserRole.findOne({ UserId: user._id });

  if (!userRole) {
    throw createError.InternalServerError();
  }

  // checking if userToken exist and refreshing it
  isSessionExists(req);

  return res
    .status(200)
    .cookie("accessToken", accessToken, tokenCookieOptions)
    .cookie("refreshToken", refreshToken, tokenCookieOptions)
    .json({
      message: "User logged in successfully",
      success: true,
      roles: userRole.Role,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
});

// Register user
// post request with name, email and password
// public access

const registerUser = asyncHandler(async (req, res) => {
  // checking for validation
  let result;
  try {
    result = await registerSchema.validateAsync(req.body);
  } catch (error) {
    if (error.isJoi === true) {
      throw createError.UnprocessableEntity(error.details[0].message);
    }
    throw createError.BadRequest();
  }

  const { name, email, password } = result;

  // checking for user existance
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw createError.Conflict("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // creating user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    throw createError.InternalServerError();
  }

  // creating user role
  const userRole = await UserRole.create({
    UserId: user._id,
    Role: "tier4",
  });

  if (!userRole) {
    await User.findByIdAndDelete(user._id);
    throw createError.InternalServerError();
  }

  const { accessToken, refreshToken } = await generateToken(user._id);

  // checking for access token and refresh token
  if (!accessToken || !refreshToken) {
    throw createError.InternalServerError();
  }

  isSessionExists(req);

  return res
    .status(200)
    .cookie("accessToken", accessToken, tokenCookieOptions)
    .cookie("refreshToken", refreshToken, tokenCookieOptions)
    .json({
      message: "User created successfully",
      success: true,
      roles: userRole.Role,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
});

// update user
// post request with password and new password
// private access
const updateUser = asyncHandler(async (req, res) => {
  // validating the body
  // extracting id from payload -> which we are getting from the middleware
  // checking for user existance
  // confirming the user password
  // updating the user password

  let result;
  try {
    result = await updateUserSchema.validateAsync(req.body);
  } catch (error) {
    if (error.isJoi === true) {
      throw createError.UnprocessableEntity(error.details[0].message);
    }
    throw createError.BadRequest();
  }

  const { password, newPassword } = result;

  const { id } = req.payload;

  // checking for user existance
  const user = await User.findById(id);

  if (!user) {
    throw createError.NotFound("User not found");
  }

  // confirming the user password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw createError.Unauthorized("Invalid Credentials");
  }

  // updating the user password

  const salt = await bcrypt.genSalt(10);
  const newHashedPassword = await bcrypt.hash(newPassword, salt);

  const updatedUser = await User.findByIdAndUpdate(
    { _id: id },
    {
      password: newHashedPassword,
    }
  );

  if (!updatedUser) {
    throw createError.InternalServerError();
  }

  res.status(200).json({ msg: "Password updated", success: true });
});

// delete request
// post request and password
// private access
const deleteUser = asyncHandler(async (req, res) => {
  // checking for validation
  // checking for id
  // checking for user existance
  //  confirming the user password
  // deleting the user

  let result;
  try {
    result = await deleteUserSchema.validateAsync(req.body);
  } catch (error) {
    if (error.isJoi === true) {
      throw createError.UnprocessableEntity(error.details[0].message);
    }
    throw createError.BadRequest();
  }

  const { id } = req.payload; // getting from verifyAccessToken
  const { password } = result;

  if (!password) {
    throw createError.BadRequest("Please provide password");
  }

  // checking for user existance
  const user = await User.findById(id);
  if (!user) {
    throw createError.NotFound("User not found");
  }

  // confirming the user password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw createError.Unauthorized("Invalid Credentials");
  }

  // deleting the user
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    throw createError.InternalServerError();
  }

  await UserRole.deleteOne({ UserId: id });
  await UserToken.deleteMany({ userId: id });

  res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json({ msg: "User deleted", success: true });
});

// user profile
// get request
// private access
const userProfile = asyncHandler(async (req, res) => {
  const { id } = req.payload;
  const user = await User.findById(id).select("-password");

  const role = await UserRole.findOne({ UserId: id });

  if (!user) {
    throw createError.NotFound("User not found");
  }

  const { name, email } = user;
  res.status(200).json({
    name: name,
    email: email,
    role: role.Role
  });
});

module.exports = {
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  userProfile,
};
