import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (error) {
      alert("Invalid admin credentials 😥");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.05)] p-8 text-white animate-fadeIn transition-all duration-500">
        <h1 className="text-4xl font-bold mb-8 text-center tracking-wide text-indigo-200 flex justify-center items-center gap-2">
          Admin Login <span className="animate-bounce text-yellow-400">🔐</span>
        </h1>

        {/* Email Input */}
        <div className="relative mb-6">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-300" />
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full py-3 pl-10 pr-4 rounded-lg bg-transparent border border-pink-400 text-white placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-6">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
          <input
            type="password"
            placeholder="Password"
            className="w-full py-3 pl-10 pr-4 rounded-lg bg-transparent border border-purple-400 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-6 text-indigo-200 italic">
          Admin access only <span className="animate-pulse">🚫</span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
