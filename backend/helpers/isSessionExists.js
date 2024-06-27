const UserToken = require("../models/userTokenModel");

const isSessionExists = async (req) => {
  const { refreshToken } = req.cookies;
  if (refreshToken) {
    await UserToken.findOneAndDelete({ token: refreshToken });
  }
}

module.exports = isSessionExists;
