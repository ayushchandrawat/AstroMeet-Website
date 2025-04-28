// ✅ Server Starting...
console.log("✅ Server is starting...");

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const { ExpressPeerServer } = require("peer");

dotenv.config();
const chat = require("./backend/routes/chat");
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// ✅ Middlewares
const updateLastActive = require("./backend/middleware/updateActivity");

// ✅ Express Middlewares
app.use(cors());
app.use(express.json());
app.use(updateLastActive); // ✅ Only user routes
app.use("/api/chat", chat);// ✅ Routes
const kundlimatchRoute = require("./backend/routes/Kundlimatch");

app.use("/api/user", require("./backend/routes/userRoutes"));
app.use("/api/admin", require("./backend/routes/adminRoutes"));
app.use("/api/horoscope", require("./backend/routes/horoscopeRoutes"));
app.use("/api/kundli", require("./backend/routes/kundli"));
app.use('/api', kundlimatchRoute);

// ✅ PeerJS Server
const peerServer = ExpressPeerServer(server, { debug: true, path: "/" });
app.use("/peerjs", peerServer);

// ✅ MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/astrologyDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
    process.exit(1); // Exit the process if MongoDB fails to connect
  });

// ✅ Test Route
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "API is working!" });
});

// ✅ Socket.io Events
io.on("connection", (socket) => {
  // console.log("🟢 A user connected");

  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg);
  });

  socket.on("disconnect", () => {
    // console.log("🔴 A user disconnected");
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
