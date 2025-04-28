const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config(); // ✅ Needed to load JWT_SECRET

const updateLastActive = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) return next();

    const token = authHeader.split(" ")[1];
    // console.log("🔐 Incoming Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ THIS is now correct
    // console.log("✅ Decoded Token:", decoded);

    if (!decoded?.id) return next();

    await User.findByIdAndUpdate(decoded.id, {
      lastActive: new Date(),
    });
  } catch (err) {
    // console.log("lastActive update failed:", err.message); // ✅ Now this shouldn't appear
  }

  next();
};

module.exports = updateLastActive;
