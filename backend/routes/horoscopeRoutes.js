const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const Horoscope = require("../models/Horoscope"); // Make sure this path is correct

// Route: /api/horoscope/:sign?date=YYYY-MM-DD
router.get("/:sign", async (req, res) => {
  const { sign } = req.params;
  const { date } = req.query;

  if (!sign) {
    return res.status(400).json({ success: false, error: "Zodiac sign is required." });
  }

  const today = new Date().toISOString().split("T")[0];
  const horoscopeDate = date || today;

  try {
    // 🔍 Check if already exists in DB
    const existing = await Horoscope.findOne({ sign, date: horoscopeDate });

    if (existing) {
      return res.status(200).json({
        success: true,
        sign,
        date: horoscopeDate,
        prediction: existing.englishPrediction,
        prediction_hindi: existing.hindiPrediction,
      });
    }

    // ✨ Prompts
    const promptEnglish = `Generate a daily horoscope in English for the zodiac sign "${sign}" on ${horoscopeDate}. Include love, career, and health.`;
    const promptHindi = `Generate a daily horoscope in Hindi for the zodiac sign "${sign}" on ${horoscopeDate}. Include love, career, and health.`;

    // ✨ English Horoscope
    const englishRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: promptEnglish }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    const englishPrediction =
      englishRes.data.candidates?.[0]?.content?.parts?.[0]?.text || "Horoscope not available.";

    // ✨ Hindi Horoscope
    const hindiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: promptHindi }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    const hindiPrediction =
      hindiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || "हिंदी अनुवाद उपलब्ध नहीं है।";

    // 💾 Save to DB
    await Horoscope.create({
      sign,
      date: horoscopeDate,
      englishPrediction,
      hindiPrediction,
    });

    // ✅ Send Response
    return res.status(200).json({
      success: true,
      sign,
      date: horoscopeDate,
      prediction: englishPrediction,
      prediction_hindi: hindiPrediction,
    });
  } catch (error) {
    console.error("❌ Gemini Horoscope Error:", error.response?.data || error.message);
    return res.status(500).json({ success: false, error: "Failed to generate horoscope" });
  }
});

module.exports = router;
