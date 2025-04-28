const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ msg: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, "admin_secret", { expiresIn: "2h" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Get all users
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ✅ Delete a user
router.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "User deleted" });
});

// ✅ Get Analytics
// ✅ Get Analytics
router.get("/analytics", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todaySignups = await User.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow },
    });

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6); // Last 7 days

    const weeklySignupsRaw = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: oneWeekAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split("T")[0]);
    }

    const weeklySignups = days.map((day) => {
      const entry = weeklySignupsRaw.find((w) => w._id === day);
      const dayName = new Date(day).toLocaleDateString("en-US", { weekday: "short" }); // 👈 Added
      return {
        day: dayName, // 👈 Now shows Mon, Tue, etc.
        signups: entry ? entry.count : 0,
      };
    });

    const activeSince = new Date();
    activeSince.setMinutes(activeSince.getMinutes() - 10);
    const activeUsers = await User.countDocuments({ lastActive: { $gte: activeSince } });
    
    res.json({ totalUsers, todaySignups, weeklySignups, activeUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Analytics error" });
  }
});

module.exports = router;
