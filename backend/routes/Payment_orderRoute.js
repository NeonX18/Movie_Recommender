var crypto = require("crypto");
const User = require("./../models/userModel");
const UserRole = require("./../models/userRoleModel");
const expressAsyncHandler = require("express-async-handler");
const express = require("express");

const createError = require("http-errors");
const router = express.Router();
const Razorpay = require("razorpay");
const { verifyAccessToken } = require("../helpers/jwt_helper");

let instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.get(
  "/getkey",
  verifyAccessToken,
  expressAsyncHandler((req, res) => {
    console.log("endpoint hit");
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({
      Key: process.env.RAZORPAY_KEY_ID,
    });
  })
);

router.post(
  "/create/order-id",
  verifyAccessToken,
  expressAsyncHandler(async (req, res) => {
    if (!req.body) {
      throw createError.BadRequest();
    }

    console.log("Create orderID request", req.body);

    var options = {
      amount: req.body.amount,
      currency: "INR",
      receipt: "rcpt",
    };

    let order;
    try {
      order = await instance.orders.create(options);
    } catch (err) {
      console.log(err);
      throw createError.InternalServerError();
    }

    res.status(200).json({id: order["id"]});
  }
))

router.post(
  "/verify",
  verifyAccessToken,
  expressAsyncHandler(async (req, res) => {
    if (!req.body) {
      throw createError.BadRequest();
    }

    if (!req.body.OrderID || !req.body.PaymentID) {
      throw createError.BadRequest();
    }

    let body = req.body.OrderID + "|" + req.body.PaymentID;
    const { id } = req.payload;

    const amnt = req.body.amount;
    console.log(amnt);

    var expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    console.log("sig Received", req.body.Signature);
    console.log("sig generated", expectedSignature);

    let response = {
      signatureIsValid: true,
    };

    if (expectedSignature !== req.body.Signature) {
      response = { signatureIsValid: false };
      throw createError.Unauthorized(response);
    }

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      throw createError.NotFound("User not found");
    }
    

    let updatedRole;
    const updateRole = async (tier) => {
      console.log(tier);

      await UserRole.findOneAndUpdate(
        { UserId: user._id },
        { $pull: { Role: { $in: ["tier1", "tier2", "tier3"] } } }
      );
      
      updatedRole = await UserRole.findOneAndUpdate(
        { UserId: user._id },
        { $push: { Role: tier } }
      );
    };

    try {
      if (amnt === 9900) {
        updateRole("tier3");
      } else if (amnt === 19900) {
        updateRole("tier2");
      } else if (amnt === 49900) {
        updateRole("tier1");
      }
    } catch (err) {
      console.log(err);
      throw createError.InternalServerError("Error while updating the role");
    }

    response.message = "Role updated successfully";

    console.log(updatedRole)

    res.status(200).send(response);
  })
);

module.exports = router;
