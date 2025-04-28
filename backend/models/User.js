const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    zodiac: { type: String },
    birthDate: { type: Date },
    gender: { type: String },
    lastActive: Date,
    isActive: { type: Boolean, default: false },

}, { timestamps: true });

// ✅ Hash Password Before Save (Fixed Now)
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// ✅ Compare Password Function (Super Fast)
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Generate JWT Token Function
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, "your_secret_key", { expiresIn: '7d' });
};

module.exports = mongoose.model('User', UserSchema);
