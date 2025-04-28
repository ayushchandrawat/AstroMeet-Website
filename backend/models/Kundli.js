const mongoose = require("mongoose");

const kundliSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  place: { type: String, required: true },
  gender: { type: String, required: true },
  zodiac: { type: String, required: true },
  kundli: { type: String, required: true }, // AI generated content
}, { timestamps: true });

module.exports = mongoose.model("Kundli", kundliSchema);
