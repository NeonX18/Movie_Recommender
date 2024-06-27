const express = require("express");
require("dotenv").config();
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const refreshRoute = require("./routes/refreshToken");
const connectDb = require("./db/connectDb");
const errorHandler = require("./middlewares/errorMiddleware");
const createError = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const paymentRoute = require("./routes/Payment_orderRoute");
const searchRoute = require("./routes/searchRoute");
const subscriptionRoute = require("./routes/subscriptionRoute");
const movieRoute = require("./routes/movieRoute");
const port = process.env.PORT || 5000;
connectDb();

const app = express();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: false })); // url encoded

// routes
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/refresh-token", refreshRoute);
app.use("/subscription", subscriptionRoute);
app.use("/payment", paymentRoute);
app.use("/search", searchRoute);
app.use("/movies", movieRoute);

app.all("*", async (req, res, next) => {
  next(createError.NotFound(`Can't find ${req.originalUrl} on this server!`));
});

// error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
