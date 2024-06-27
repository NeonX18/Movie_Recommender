const mongoose = require("mongoose")

const userTokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60*86400 // 60days
  }
})

const UserToken = mongoose.model("UserToken", userTokenSchema, "user_tokens")

module.exports = UserToken