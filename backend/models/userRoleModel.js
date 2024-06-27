const mongoose = require("mongoose");


const userRoleSchema = new mongoose.Schema(
  {
    UserId:{
      type: String,
      ref:'User',
      required:true
  },
    Role:{
        type:[String],
        required:true,
        enum : ["admin","tier1","tier2","tier3","tier4"],
        default:["tier4"]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models?.UserRoles || mongoose.model("UserRoles", userRoleSchema, 'user_roles');
