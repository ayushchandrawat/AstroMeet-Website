import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";

const socket = io("http://localhost:5000");

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.on("connect", () => console.log("✅ Socket connected"));

    socket.on("chatMessage", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => socket.off("chatMessage");
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      // 🔥 Call backend for Gemini response
      const response = await axios.post("http://localhost:5000/api/chat/analyze", {
        userId: "demoUser123", // dummy user ID for now
        message
      });

      const botReply = response.data.botMessage?.text || "⚠️ No response from AI.";

      // 🔁 Emit both user and AI messages
      socket.emit("chatMessage", { user: "You", text: message });
      socket.emit("chatMessage", { user: "AI", text: botReply });

      setMessage("");
    } catch (err) {
      console.error("❌ Error:", err);
      socket.emit("chatMessage", {
        user: "AI",
        text: "⚠️ Something went wrong, try again!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#140021] via-[#1a0033] to-[#260041] p-6">
      <div className="w-full max-w-3xl h-[90vh] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 text-center bg-white/10 border-b border-white/20 text-pink-300 text-2xl font-bold">
          🔮 AstroMeet AI Chat
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {chat.map((msg, index) => (
            <div key={index} className={`flex ${msg.user === "You" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm text-sm ${
                  msg.user === "You"
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                    : "bg-white/20 text-emerald-200 backdrop-blur-sm"
                }`}
              >
                <span className="block font-semibold text-xs mb-1 opacity-80">{msg.user}</span>
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-center text-sm text-gray-400">🤖 Thinking...</div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white/10 border-t border-white/20 flex items-center gap-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 p-3 rounded-2xl bg-[#1f1f2e] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-pink-600 hover:bg-pink-500 transition-all px-4 py-3 rounded-2xl text-white text-sm flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            <FaPaperPlane /> Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
