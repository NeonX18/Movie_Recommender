
const errorHandler = (err, req, res, next) => {

  const statusCode = err.status ? err.status : 500;

  res.status(statusCode).json({
    statusCode: statusCode,
    status: statusCode >= 400 && statusCode < 500 ? "fail" : "error",
    success: false,
    msg: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
  next();
};

module.exports = errorHandler;
