import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // Token check kar raha hai
  return token ? <Outlet /> : <Navigate to="/login" replace />; // Agar token nahi hai, toh login pe bhej do
};

export default ProtectedRoute;
