const mongoose = require("mongoose");

const logoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: { type: String },        // 🆕 Add this
  email: { type: String },       // 🆕 Add this
  logoutTime: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("Logout", logoutSchema);
