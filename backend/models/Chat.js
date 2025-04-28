const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user: {
    type: String, // 👈 changed from ObjectId to String
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);
