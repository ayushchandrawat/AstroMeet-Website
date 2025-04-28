import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaComments,
  FaUserAstronaut,
  FaStar,
  FaSignOutAlt,
} from "react-icons/fa";
import { GiNestedHexagons } from "react-icons/gi";
import "./Dashboard.css"; // Keep your background and animation styles

// 🔄 Logout Function with API call
const handleLogout = async () => {
  try {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("❌ User ID not found. Please login again.");
      window.location.href = "/login";
      return;
    }

    const res = await fetch("http://localhost:5000/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();
    console.log("🔁 Logout API Response:", data);

    // ✅ Clear Local Storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    alert("✅ Logout Successful!");
    window.location.href = "/";
  } catch (error) {
    console.error("❌ Logout Error:", error);
    alert("Logout failed. Try again.");
  }
};

const Dashboard = () => {
  return (
    <div className="min-h-screen relative flex flex-col items-center bg-gradient-to-br from-[#0a0022] via-[#1f003d] to-[#3a006e] text-white overflow-hidden">
      {/* Starry Background */}
      <div className="absolute inset-0 bg-stars z-0"></div>

      {/* Header */}
      <header className="z-10 w-full max-w-7xl mt-6 px-6 flex justify-between items-center bg-white/10 backdrop-blur-md py-4 rounded-2xl shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold tracking-wide flex items-center gap-3">
          🔮 AstroMeet Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <Link
            to="/profile"
            className="flex items-center gap-2 text-sm font-medium bg-purple-700 px-5 py-2 rounded-xl hover:bg-purple-600 transition-all duration-300 shadow-md"
          >
            <FaUserAstronaut /> Profile
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium bg-red-500 px-5 py-2 rounded-xl hover:bg-red-600 transition-all duration-300 shadow-md"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* Cards */}
      <section className="z-10 mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-6">
        <DashboardCard icon={<FaHome />} title="Home" link="/" color="from-yellow-400 to-yellow-600" />
        <DashboardCard icon={<FaComments />} title="Chat" link="/chat" color="from-blue-400 to-blue-600" />
        <DashboardCard icon={<FaStar />} title="Horoscope" link="/horoscope" color="from-yellow-300 to-orange-400" />
        <DashboardCard icon={<FaUserAstronaut />} title="Kundli Page" link="/kundlipage" color="from-pink-400 to-pink-600" />
        <DashboardCard icon={<FaComments />} title="AstroMeet Chat" link="/chat-with-astrologer" color="from-orange-400 to-pink-600" />
        <DashboardCard icon={<GiNestedHexagons />} title="Kundli Matching" link="/kundlimatch" color="from-purple-500 to-orange-0" />

      </section>

      {/* Footer */}
      <footer className="z-10 mt-20 mb-6 text-gray-300 text-sm">
        🚀 Powered by <span className="text-yellow-300 font-semibold">AstroMeet</span> | Stay aligned with the stars ✨
      </footer>
    </div>
  );
};

const DashboardCard = ({ icon, title, link, color }) => (
  <Link
    to={link}
    className={`dashboard-card p-8 bg-white/10 hover:bg-white/20 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 transform hover:-translate-y-2 border border-white/20 group`}
  >
    <div
      className={`text-4xl mb-4 bg-gradient-to-br ${color} text-white p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300`}
    >
      {icon}
    </div>
    <h2 className="text-xl font-bold mb-2 group-hover:text-yellow-300 transition-all">
      {title}
    </h2>
    <p className="text-sm text-gray-300">
      {title === "Home" && "Explore astrology insights tailored for you."}
      {title === "Chat" && "Talk with astrologers & discover your path."}
      {title === "Horoscope" && "Your daily, weekly & monthly readings."}
      {title === "Kundli Page" && "Your complete Kundli and preferences."}
      {title === "AstroMeet Chat" && "Know your life through the experience and knowledge of astrologers."}
      {title === "Kundli Matching" && "Compares birth charts to predict compatibility, love, and harmony in marriage."}

    </p>
  </Link>
);

export default Dashboard;
