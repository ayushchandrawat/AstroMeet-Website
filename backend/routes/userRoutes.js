const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const mongoose = require("mongoose");

const User = require("../models/User");
const Logout = require("../models/Logout");

const authenticateUser = require("../middleware/authUser"); // ✅ Consistent JWT middleware
const auth = require("../middleware/authAdmin"); // ✅ Admin middleware

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Store image in memory

// ✅ Register Route
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, phone, zodiac, birthDate, gender } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ name, email, password, phone, zodiac, birthDate, gender });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ token, user: newUser });

    } catch (error) {
        console.error("❌ Register Error:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        user.isActive = true;
        user.lastActive = new Date();
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// ✅ Get Profile Route
router.get("/profile", authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Update Profile Route
router.put("/updateProfile", authenticateUser, upload.single("avatar"), async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, phone, zodiac, birthDate, gender } = req.body;

        const updateFields = { name, email, phone, zodiac, birthDate, gender };

        if (req.file) {
            updateFields.avatar = `data:image/png;base64,${req.file.buffer.toString("base64")}`;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

        res.json({ message: "Profile updated successfully!", user: updatedUser });
    } catch (error) {
        console.error("❌ Profile Update Error:", error.message);
        res.status(500).json({ error: "Failed to update profile" });
    }
});

// ✅ Logout Route
router.post("/logout", async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        const user = await User.findById(userId).select("name email");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.isActive = false;
        await user.save();

        const logoutEntry = await Logout.create({
            userId: new mongoose.Types.ObjectId(userId),
            name: user.name,
            email: user.email
        });

        res.status(200).json({
            success: true,
            message: "Logout recorded",
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to save logout" });
    }
});

module.exports = router;
