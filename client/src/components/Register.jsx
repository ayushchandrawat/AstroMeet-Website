import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

const Register = ({ setUser }) => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [zodiac, setZodiac] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Zodiac Signs (English + Hindi)
    const zodiacSigns = [
        { value: "Aries", label: "Aries (मेष)" },
        { value: "Taurus", label: "Taurus (वृषभ)" },
        { value: "Gemini", label: "Gemini (मिथुन)" },
        { value: "Cancer", label: "Cancer (कर्क)" },
        { value: "Leo", label: "Leo (सिंह)" },
        { value: "Virgo", label: "Virgo (कन्या)" },
        { value: "Libra", label: "Libra (तुला)" },
        { value: "Scorpio", label: "Scorpio (वृश्चिक)" },
        { value: "Sagittarius", label: "Sagittarius (धनु)" },
        { value: "Capricorn", label: "Capricorn (मकर)" },
        { value: "Aquarius", label: "Aquarius (कुंभ)" },
        { value: "Pisces", label: "Pisces (मीन)" },
    ];

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");  

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post("http://localhost:5000/api/user/register", {
                name,
                email,
                password,
                phone,
                zodiac,
                birthDate,
                gender
            });

            console.log("Response from server:", data);
            
            if (data.token && data.user) {
                localStorage.setItem("token", data.token);

                if (typeof setUser === 'function') {
                    console.log("Calling setUser with:", data.user);
                    setUser(data.user);
                    setSuccessMessage("Registration successful! Welcome!");
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                } else {
                    console.error("setUser is not a function");
                    setError("Error setting user. Please try again.");
                }
            } else {
                setError("Registration failed. Try again!");
            }

        } catch (error) {
            console.error("Error during registration:", error.response || error);
            if (error.response) {
                setError(`Server error: ${error.response.data.message || "Please try again!"}`);
            } else {
                setError("Network error. Please check your connection.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-xl font-bold text-gray-100 mt-4">Welcome to AstroMeet !</h1>
            <p className="text-gray-400 text-sm">Create an account</p>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            {successMessage && <div className="text-green-500 text-sm mb-4">{successMessage}</div>}

            <form onSubmit={handleRegister} className="w-80 space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-3 bg-gray-800 text-white border border-gray-500 rounded-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 bg-gray-800 text-white border border-gray-500 rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Phone"
                    className="w-full p-3 bg-gray-800 text-white border border-gray-500 rounded-lg"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                {/* Zodiac Sign Dropdown */}
                <select
                    className="w-full p-3 bg-gray-800 text-white border border-gray-500 rounded-lg"
                    value={zodiac}
                    onChange={(e) => setZodiac(e.target.value)}
                    required
                >
                    <option value="">Select Zodiac Sign</option>
                    {zodiacSigns.map((sign, index) => (
                        <option key={index} value={sign.value}>{sign.label}</option>
                    ))}
                </select>


                <div className="relative">
  <input
    type="date"
    placeholder="mm/dd/yyyy"
    className="w-full p-3 pl-10 bg-gray-800 text-white border border-gray-500 rounded-lg"
    value={birthDate}
    onChange={(e) => setBirthDate(e.target.value)}
    required
  />
  <CalendarDaysIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
</div>




                <select
                    className="w-full p-3 bg-gray-800 text-white border border-gray-500 rounded-lg"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full p-3 bg-gray-800 text-white border border-gray-500 rounded-lg"
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

                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="w-full p-3 bg-gray-800 text-white border border-gray-500 rounded-lg"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-4 top-3 text-gray-400"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full p-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            <p className="text-gray-400 text-sm mt-4">
                Already have an account? <a href="/login" className="text-yellow-400 font-semibold">Login!</a>
            </p>
        </div>
    );
};

export default Register;
