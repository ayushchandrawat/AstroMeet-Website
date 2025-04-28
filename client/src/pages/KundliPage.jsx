import React, { useState } from 'react';
import axios from 'axios';

const KundliPage = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [gender, setGender] = useState('');
  const [zodiac, setZodiac] = useState('');
  const [kundliData, setKundliData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchKundli = async () => {
    setLoading(true);
    setKundliData(null); // clear previous data

    // Validation
    if (!name || !dob || !time || !place || !gender || !zodiac) {
      alert("⚠️ Please fill all fields before generating kundli.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/kundli/analyze', {
        name,
        date: dob,
        time,
        place,
        gender,
        zodiac
      });

      if (response.data && response.data.kundli) {
        setKundliData(response.data.kundli);
      } else {
        alert("⚠️ Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("❌ Kundli API Error:", err);

      if (err.response?.status === 429) {
        alert("🚫 Gemini quota exceeded. Please try again later.");
      } else if (err.response?.status === 500) {
        alert("🔥 Server error! Try after some time.");
      } else {
        alert("❌ Failed to generate kundli. Check your details or try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-6 py-10 min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#3a3a6c] to-[#0f0c29] text-white font-sans">
      <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse">
        🧿 AstroMeet Kundli Generator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white/10 backdrop-blur-md p-8 rounded-2xl w-full max-w-3xl shadow-2xl border border-yellow-400/30">
        <input 
          className="p-3 rounded bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400" 
          placeholder="🧑 Name" 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          className="p-3 rounded bg-white/20 text-white focus:ring-2 focus:ring-yellow-400" 
          type="date" 
          onChange={(e) => setDob(e.target.value)} 
        />
        <input 
          className="p-3 rounded bg-white/20 text-white focus:ring-2 focus:ring-yellow-400" 
          type="time" 
          onChange={(e) => setTime(e.target.value)} 
        />
        <input 
          className="p-3 rounded bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400" 
          placeholder="📍 Enter Place" 
          onChange={(e) => setPlace(e.target.value)} 
        />

        {/* Gender Dropdown */}
        <select 
          className="p-3 rounded bg-white/20 text-white focus:ring-2 focus:ring-yellow-400 appearance-none"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
          onChange={(e) => setGender(e.target.value)}
        >
          <option className="text-black" value="">⚧️ Select Gender</option>
          <option className="text-black" value="Male">🙎‍♂️ Male</option>
          <option className="text-black" value="Female">🙎‍♀️ Female</option>
          <option className="text-black" value="Other">⚧️ Other</option>
        </select>

        {/* Zodiac Dropdown */}
        <select 
          className="p-3 rounded bg-white/20 text-white focus:ring-2 focus:ring-yellow-400 appearance-none"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
          onChange={(e) => setZodiac(e.target.value)}
        >
          <option className="text-black" value="">🌟 Select Zodiac</option>
          <option className="text-black" value="Aries (मेष)">Aries (मेष)</option>
          <option className="text-black" value="Taurus (वृषभ)">Taurus (वृषभ)</option>
          <option className="text-black" value="Gemini (मिथुन)">Gemini (मिथुन)</option>
          <option className="text-black" value="Cancer (कर्क)">Cancer (कर्क)</option>
          <option className="text-black" value="Leo (सिंह)">Leo (सिंह)</option>
          <option className="text-black" value="Virgo (कन्या)">Virgo (कन्या)</option>
          <option className="text-black" value="Libra (तुला)">Libra (तुला)</option>
          <option className="text-black" value="Scorpio (वृश्चिक)">Scorpio (वृश्चिक)</option>
          <option className="text-black" value="Sagittarius (धनु)">Sagittarius (धनु)</option>
          <option className="text-black" value="Capricorn (मकर)">Capricorn (मकर)</option>
          <option className="text-black" value="Aquarius (कुंभ)">Aquarius (कुंभ)</option>
          <option className="text-black" value="Pisces (मीन)">Pisces (मीन)</option>
        </select>
      </div>

      <button
        className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-orange-600 hover:to-red-500 transition-all duration-300 shadow-lg text-black font-semibold tracking-wide"
        onClick={fetchKundli}
        disabled={loading}
      >
        {loading ? "🔄 Generating..." : "✨ Generate Kundli"}
      </button>

      {kundliData && (
        <div className="mt-10 w-full max-w-4xl bg-white/10 p-6 rounded-xl shadow-xl border border-yellow-400/30">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">📜 Your Personalized Kundli</h2>
          {kundliData.split("🪔").map((section, idx) => (
            <p key={idx} className="text-white text-md mb-4 whitespace-pre-line leading-relaxed">
              {section.trim()}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default KundliPage;
