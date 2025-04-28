import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import HoroscopePage from "./pages/HoroscopePage";
import ProfilePage from "./pages/ProfilePage";
import KundliPage from "./pages/KundliPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Analytics from "./pages/Analytics";
// Optional: If you want a ProtectedRoute for admin
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ChatWithAstrologer from "./pages/ChatWithAstrologer";
import KundliMatching from './components/KundliMatching';
function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      {/* ✅ Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register setUser={setUser} />} />
      <Route path="/admin" element={<AdminLogin />} />

      {/* ✅ User Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/horoscope" element={<HoroscopePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/kundlipage" element={<KundliPage />} />
        <Route path="/chat-with-astrologer" element={<ChatWithAstrologer />} />
        <Route path="/kundlimatch" element={<KundliMatching />} />

      </Route>

      {/* ✅ Admin Protected Routes */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<Analytics />} />

      </Route>
    </Routes>
  );
}

export default App;
