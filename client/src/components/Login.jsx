import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); 
    
        console.log("🌍 Backend URL:", import.meta.env.VITE_BACKEND_URL);
    
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
            console.log("📡 Sending Request To:", `${backendUrl}/api/user/login`);
            console.log("📝 Request Body:", { email, password });
    
            const { data } = await axios.post(
                `${backendUrl}/api/user/login`, 
                { email, password },
                { headers: { "Content-Type": "application/json" } }  // ✅ Ensure correct headers
            );

            // console.log("✅ Login Success:", data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user._id); // ✅ Add this line to store userId
            setUser(data.user);
            navigate("/dashboard");
            
        } catch (error) {
            // console.error("❌ Login Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Invalid Credentials");
        } finally {
            setLoading(false);
        }
    };
    
    
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            {/* Logo */}
            <div className="flex flex-col items-center mb-6">
                <div className="bg-black rounded-full p-4 relative">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold">🪐</span>
                    </div>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 rounded-full"></div>
                </div>
                <h1 className="text-xl font-bold text-gray-100 mt-4">Welcome to AstroMeetLogin !</h1>
                <p className="text-gray-400 text-sm">Login to continue</p>
            </div>

            {/* Error Message */}
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="w-80 space-y-4">
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 bg-gray-800 text-white border border-gray-500 rounded-lg focus:ring-2 focus:ring-yellow-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full p-3 bg-gray-800 text-white border border-gray-500 rounded-lg focus:ring-2 focus:ring-yellow-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-4 top-3 text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full p-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition"
                    disabled={loading}
                >
                    {loading ? "Logging In..." : "Login"}
                </button>
            </form>

            {/* Links */}
            <p className="text-gray-400 text-sm mt-4">
                <a href="#" className="text-yellow-400 font-semibold">Forgot password?</a>
            </p>
            <p className="text-gray-400 text-sm mt-2">
                Don’t have an account? <a href="/Register" className="text-yellow-400 font-semibold">Register!</a>
            </p>
        </div>
    );
};

export default Login;
