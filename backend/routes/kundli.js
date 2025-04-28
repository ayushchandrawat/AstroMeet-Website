const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const Kundli = require("../models/Kundli"); // 👈 import model

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/analyze", async (req, res) => {
  try {
    const { name, date, time, place, gender, zodiac } = req.body;

    const prompt = `
    Generate a personalized horoscope (Kundli) for:
    Name: ${name}
    Date of Birth: ${date}
    Time: ${time}
    Place: ${place}
    Gender: ${gender}
    Zodiac Sign: ${zodiac}

    Return it in both English and Hindi.
    Separate both with 🪔 emoji.
    Use poetic, spiritual, and astrology-specific tone.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const chat = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const kundli = chat.response.candidates[0].content.parts[0].text;

    // 🔥 Save to DB
    await Kundli.create({
      name,
      date,
      time,
      place,
      gender,
      zodiac,
      kundli,
    });

    res.json({ kundli });

  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Kundli AI generation failed!" });
  }
});

module.exports = router;
