const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
      required: true,
      enum: ["admin", "tier1", "tier2", "tier3", "tier4"],
      default: "tier4",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models?.User || mongoose.model("User", userSchema);
