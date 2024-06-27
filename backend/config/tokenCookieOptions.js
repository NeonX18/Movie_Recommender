const SAME_SITE = "None";
const SECURE_COOKIE = process.env.NODE_ENV === "production" ? true : false;
const httpOnly = true;

const tokenCookieOptions = {
  httpOnly: httpOnly,
  sameSite: true,
  secure: SECURE_COOKIE,
  // maxAge: 90 * 24 * 60 * 60 * 1000,
  expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
};

module.exports = tokenCookieOptions;
