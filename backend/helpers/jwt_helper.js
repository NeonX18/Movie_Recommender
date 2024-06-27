const jwt = require("jsonwebtoken");

const createError = require("http-errors");
const UserToken = require("../models/userTokenModel");
const asyncHandler = require("express-async-handler");

module.exports = {
  signAccessToken: (id) => {
    return new Promise((resolve, reject) => {
      const payload = { id };

      const secret = process.env.JWT_SECRET;

      const options = {
        expiresIn: "15s",
        issuer: "kgplay",
      };

      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          return reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },

  verifyAccessToken: asyncHandler(async (req, res, next) => {
    const token =
      req.cookies?.accessToken ||
      req.header("authorization")?.replace("Bearer ", "");

    if (!token) {
      return next(createError.Unauthorized());
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          return next(createError.Unauthorized());
        } else if (err.name === "TokenExpiredError") {
          return next(createError.Forbidden("Token Expired, Login again"));
        } else {
          return next(createError.Unauthorized());
        }
      }
      
      req.payload = payload;
      next();
    });
  }),

  signRefreshToken: (id) => {
    return new Promise((resolve, reject) => {
      const payload = { id };

      const secret = process.env.REFRESH_TOKEN_SECRET;

      const options = {
        expiresIn: "60d",
        issuer: "kgplay",
      };

      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          return reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },

  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      const userToken = UserToken.findOne({ token: refreshToken });

      if (!userToken) {
        return reject(createError.Unauthorized());
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) return reject(createError.Unauthorized());
          const { id } = payload;
          resolve(id);
        }
      );
    });
  },
};
