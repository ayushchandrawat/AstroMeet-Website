const mongoose = require("mongoose");

const HoroscopeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // Optional
  zodiacSign: String,
  date: { type: String }, // ISO date string (yyyy-mm-dd)
  prediction: String,
  prediction_hindi: String,
});

module.exports = mongoose.model("Horoscope", HoroscopeSchema);
