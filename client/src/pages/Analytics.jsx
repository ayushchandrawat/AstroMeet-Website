import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Analytics = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [todaySignups, setTodaySignups] = useState(0);
  const [weeklyData, setWeeklyData] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0); // ✅ NEW

  useEffect(() => {
    fetchAnalytics(); // Initial fetch

    const interval = setInterval(() => {
      fetchAnalytics(); // Auto-refresh every 10 seconds
    }, 10000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/analytics", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      // console.log("Fetched Analytics:", res.data); // Debugging log

      setTotalUsers(res.data.totalUsers);
      setTodaySignups(res.data.todaySignups);
      setWeeklyData(res.data.weeklySignups);
      setActiveUsers(res.data.activeUsers); // ✅ NEW
    } catch (err) {
      // console.error("Error fetching analytics:", err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#1f1c2c] to-[#928DAB] text-white">
      <h2 className="text-4xl font-bold mb-10">📊 Admin Analytics Dashboard</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-2xl shadow-2xl">
          <h4 className="text-lg font-semibold text-white mb-1">Total Users</h4>
          <p className="text-4xl font-bold">{totalUsers}</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-2xl shadow-2xl">
          <h4 className="text-lg font-semibold text-white mb-1">Today’s Signups</h4>
          <p className="text-4xl font-bold">{todaySignups}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-2xl shadow-2xl">
          <h4 className="text-lg font-semibold text-white mb-1">Active Users</h4>
          <p className="text-4xl font-bold">{activeUsers}</p>
        </div>
      </div>

      {/* Refresh Button */}
      <button
        onClick={fetchAnalytics}
        className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-300"
      >
        🔄 Refresh Now
      </button>

      {/* Chart */}
      <div className="bg-white/10 border border-white/20 p-6 rounded-2xl backdrop-blur-xl shadow-2xl">
        <h3 className="text-2xl font-semibold mb-6">📅 Weekly Signups</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={weeklyData}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="day" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f1c2c",
                border: "1px solid #ffffff20",
                color: "#fff",
              }}
            />
            <Bar
              dataKey="signups"
              fill="#00d09c"
              radius={[10, 10, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
