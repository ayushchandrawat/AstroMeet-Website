import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Loader2,
  Trash2,
  Search,
  SlidersHorizontal,
  BarChart,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    todaySignups: 0,
    activeUsers: 0,
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/analytics");
      setAnalytics(res.data);
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#1f1c2c] to-[#928DAB] text-white">
      {/* Sidebar */}
      <div className="bg-[#0F111A] h-screen transition-all duration-300 group hover:w-64 w-20 p-4 fixed z-10">
        <div className="mb-8">
          <h2 className="text-xl font-bold tracking-wide group-hover:block hidden">🧠 Admin Panel</h2>
        </div>
        <ul className="space-y-4">
          <Link to="/admin/dashboard">
            <li className="flex items-center gap-3 cursor-pointer hover:bg-white/10 p-2 rounded-md">
              <LayoutDashboard className="w-5 h-5" />
              <span className="group-hover:block hidden">Dashboard</span>
            </li>
          </Link>
          <Link to="/admin/analytics">
            <li className="flex items-center gap-3 cursor-pointer hover:bg-white/10 p-2 rounded-md">
              <BarChart className="w-5 h-5" />
              <span className="group-hover:block hidden">Analytics</span>
            </li>
          </Link>
          <li className="flex items-center gap-3 cursor-pointer hover:bg-white/10 p-2 rounded-md">
            <Settings className="w-5 h-5" />
            <span className="group-hover:block hidden">Settings</span>
          </li>
          <Link to="/">
            <li className="flex items-center gap-3 cursor-pointer hover:bg-red-600/20 p-2 rounded-md">
              <LogOut className="w-5 h-5 text-red-500" />
              <span className="group-hover:block hidden text-red-500">Logout</span>
            </li>
          </Link>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-20 md:ml-64 p-6 transition-all">
        {/* Analytics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 rounded-xl shadow-xl text-white">
            <h4 className="text-lg font-medium">Total Users</h4>
            <p className="text-3xl font-bold mt-2">{analytics.totalUsers}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-xl shadow-xl text-white">
            <h4 className="text-lg font-medium">Today's Signups</h4>
            <p className="text-3xl font-bold mt-2">{analytics.todaySignups}</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-xl shadow-xl text-white">
            <h4 className="text-lg font-medium">Active Users</h4>
            <p className="text-3xl font-bold mt-2">{analytics.activeUsers}</p>
          </div>
        </div>

        {/* Users Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-wide">All Users</h2>
            <p className="text-sm text-gray-300 mt-1">
              Total Users:{" "}
              <span className="font-semibold text-yellow-300">
                {users.length}
              </span>
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Search user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none"
            />
            <button className="p-2 bg-white/10 rounded-md hover:bg-white/20">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white/10 rounded-md hover:bg-white/20">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center mt-20">
            <Loader2 className="animate-spin h-10 w-10 text-white" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all"
              >
                <p className="text-xl font-semibold mb-1">
                  👤 {user.name || "N/A"}
                </p>
                <p className="text-sm text-gray-300 mb-4">📧 {user.email}</p>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm"
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
