const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticateToken = require("../middleware/authUser");  // ✅ Fix: Middleware Import
require("dotenv").config();

const router = express.Router();

// // ✅ Profile Route
// router.get("/profile", authenticateToken, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select("-password");
//         if (!user) return res.status(404).json({ message: "User not found" });

//         res.json(user);
//     } catch (err) {
//         console.error("❌ Profile Fetch Error:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// });

module.exports = router;
