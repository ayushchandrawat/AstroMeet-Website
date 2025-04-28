const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

// 👉 Connect to astrologyDB instead of astroDB
mongoose.connect("mongodb://127.0.0.1:27017/astrologyDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdmin = async () => {
  const email = "ayushchandrawat67@gmail.com";
  const password = "ACbanna2";

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log("Admin already exists");
    return mongoose.disconnect();
  }

  const hashed = await bcrypt.hash(password, 10);
  await Admin.create({ email, password: hashed });
  console.log("✅ Admin created successfully in astrologyDB");
  mongoose.disconnect();
};

createAdmin();
