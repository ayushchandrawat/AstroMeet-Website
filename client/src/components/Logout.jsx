import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogoutButton = ({ setUser, user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // 🔥 Save logout in DB
    if (user && user._id) {
      try {
        await axios.post("http://localhost:5000/api/user/logout", { userId: user._id });
      } catch (err) {
        console.error("Logout log failed:", err);
      }
    }

    // 🔐 Remove token
    localStorage.removeItem("token");

    // 🧠 Reset user state
    if (typeof setUser === "function") {
      setUser(null);
    }

    alert("✅ Logout Successful!");
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      🔒 Logout
    </button>
  );
};

export default LogoutButton;
