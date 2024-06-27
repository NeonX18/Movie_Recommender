const User = require("../models/userModel");
const UserRole=require("../models/userRoleModel");
const asyncHandler = require("express-async-handler");


const updateUserRole= asyncHandler(async (req, res) =>{
    const UserId = req.id;
    const { newRole } = req.body;
  
    try {
      const userRole = await UserRole.findOne({ UserId });
  
      if (!userRole) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      userRole.Role = newRole;
      await userRole.save();
  
      res.json(userRole);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = {
  updateUserRole
};
