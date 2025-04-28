const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = express.Router();
const Chat = require("../models/Chat");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST: Chat with Gemini AI
router.post("/analyze", async (req, res) => {
  try {
    const { userId, message } = req.body;

    // ✅ Allow dummy userId for now
    if (!message) {
      return res.status(400).json({ message: "Message is required." });
    }

    const now = new Date();
    const currentDate = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    const currentTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    const prompt = `You are AstroMeet AI. Respond smartly to user queries. Include real-time details if asked.\n\nCurrent Date: ${currentDate}\nCurrent Time: ${currentTime}\n\nUser: ${message}`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const chat = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    const botReply = chat.response.candidates[0].content.parts[0].text;

    // Save to DB
    const userMessage = new Chat({
      user: userId || "anonymous",
      message,
      response: botReply
    });
    await userMessage.save();

    res.json({
      userMessage,
      botMessage: { text: botReply }
    });

  } catch (error) {
    console.error("❌ Gemini Chat Error:", error.message);
    res.status(500).json({ message: "AI response error", error: error.message });
  }
});

module.exports = router;
