import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function KundliMatching() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const inputRefs = useRef([]);
  const autoTabFields = ['day', 'month', 'year', 'hour', 'minute', 'second'];

  const [boyData, setBoyData] = useState({ name: '', day: '', month: '', year: '', hour: '', minute: '', second: '', birthPlace: '' });
  const [girlData, setGirlData] = useState({ name: '', day: '', month: '', year: '', hour: '', minute: '', second: '', birthPlace: '' });

  const [gunaData, setGunaData] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [mangalDosha, setMangalDosha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [matchResult, setMatchResult] = useState(null);

  // Dummy results to cycle through on Step 4
const dummyResults = [
  {
    guna_milan: [
      { name: "Varna",   boy_parameter: "Vaisya",   girl_parameter: "Vaisya",   maximum_points: 1, obtained_points: 1, aspect: "Work" },
      { name: "Vasya",   boy_parameter: "Manav",    girl_parameter: "Manav",    maximum_points: 2, obtained_points: 2, aspect: "Dominance" },
      { name: "Tara",    boy_parameter: "Sampat",   girl_parameter: "Sampat",   maximum_points: 3, obtained_points: 3, aspect: "Destiny" },
      { name: "Yoni",    boy_parameter: "Mahis",    girl_parameter: "Mahis",    maximum_points: 4, obtained_points: 4, aspect: "Mentality" },
      { name: "Maitri",  boy_parameter: "Mercury",  girl_parameter: "Mercury",  maximum_points: 5, obtained_points: 5, aspect: "Compatibility" },
      { name: "Gana",    boy_parameter: "Devta",    girl_parameter: "Devta",    maximum_points: 6, obtained_points: 6, aspect: "Guna Level" },
      { name: "Bhakoot", boy_parameter: "Virgo",    girl_parameter: "Virgo",    maximum_points: 7, obtained_points: 7, aspect: "Love compatibility" },
      { name: "Nadi",    boy_parameter: "Adi",      girl_parameter: "Adi",      maximum_points: 8, obtained_points: 8, aspect: "Health" }
    ],
    total_score: 36,
    mangal_dosha_present: false
  },
  {
    guna_milan: [
      { name: "Varna",   boy_parameter: "Shudra",   girl_parameter: "Vaishya",  maximum_points: 1, obtained_points: 0, aspect: "Work" },
      { name: "Vasya",   boy_parameter: "Vanchar",  girl_parameter: "Jalchar",  maximum_points: 2, obtained_points: 2, aspect: "Dominance" },
      { name: "Tara",    boy_parameter: "Vipat",    girl_parameter: "Sampat",   maximum_points: 3, obtained_points: 2, aspect: "Destiny" },
      { name: "Yoni",    boy_parameter: "Dog",      girl_parameter: "Cat",      maximum_points: 4, obtained_points: 3, aspect: "Mentality" },
      { name: "Maitri",  boy_parameter: "Moon",     girl_parameter: "Saturn",   maximum_points: 5, obtained_points: 1, aspect: "Compatibility" },
      { name: "Gana",    boy_parameter: "Manushya", girl_parameter: "Rakshas",  maximum_points: 6, obtained_points: 4, aspect: "Guna Level" },
      { name: "Bhakoot", boy_parameter: "Libra",    girl_parameter: "Aries",    maximum_points: 7, obtained_points: 3, aspect: "Love compatibility" },
      { name: "Nadi",    boy_parameter: "Madhya",   girl_parameter: "Madhya",   maximum_points: 8, obtained_points: 5, aspect: "Health" }
    ],
    total_score: 20,
    mangal_dosha_present: true
  },
  {
    guna_milan: [
      { name: "Varna",   boy_parameter: "Kshatriya",girl_parameter: "Brahmin",  maximum_points: 1, obtained_points: 1, aspect: "Work" },
      { name: "Vasya",   boy_parameter: "Manav",    girl_parameter: "Vanchar",  maximum_points: 2, obtained_points: 1, aspect: "Dominance" },
      { name: "Tara",    boy_parameter: "Sampat",   girl_parameter: "Sampat",   maximum_points: 3, obtained_points: 3, aspect: "Destiny" },
      { name: "Yoni",    boy_parameter: "Tiger",    girl_parameter: "Tiger",    maximum_points: 4, obtained_points: 4, aspect: "Mentality" },
      { name: "Maitri",  boy_parameter: "Mars",     girl_parameter: "Mars",     maximum_points: 5, obtained_points: 5, aspect: "Compatibility" },
      { name: "Gana",    boy_parameter: "Rakshas",  girl_parameter: "Rakshas",  maximum_points: 6, obtained_points: 6, aspect: "Guna Level" },
      { name: "Bhakoot", boy_parameter: "Pisces",   girl_parameter: "Pisces",   maximum_points: 7, obtained_points: 4, aspect: "Love compatibility" },
      { name: "Nadi",    boy_parameter: "Antya",    girl_parameter: "Madhya",   maximum_points: 8, obtained_points: 3, aspect: "Health" }
    ],
    total_score: 27,
    mangal_dosha_present: false
  },
  {
    guna_milan: [
      { name: "Varna",   boy_parameter: "Brahmin",  girl_parameter: "Kshatriya",maximum_points: 1, obtained_points: 1, aspect: "Work" },
      { name: "Vasya",   boy_parameter: "Chatuspad",girl_parameter: "Chatuspad",maximum_points: 2, obtained_points: 2, aspect: "Dominance" },
      { name: "Tara",    boy_parameter: "Pratyari", girl_parameter: "Sampat",   maximum_points: 3, obtained_points: 2, aspect: "Destiny" },
      { name: "Yoni",    boy_parameter: "Horse",    girl_parameter: "Elephant", maximum_points: 4, obtained_points: 3, aspect: "Mentality" },
      { name: "Maitri",  boy_parameter: "Sun",      girl_parameter: "Moon",     maximum_points: 5, obtained_points: 4, aspect: "Compatibility" },
      { name: "Gana",    boy_parameter: "Devta",    girl_parameter: "Rakshas",  maximum_points: 6, obtained_points: 1, aspect: "Guna Level" },
      { name: "Bhakoot", boy_parameter: "Capricorn",girl_parameter: "Cancer",   maximum_points: 7, obtained_points: 2, aspect: "Love compatibility" },
      { name: "Nadi",    boy_parameter: "Madhya",   girl_parameter: "Madhya",   maximum_points: 8, obtained_points: 1, aspect: "Health" }
    ],
    total_score: 16,
    mangal_dosha_present: true
  },
  {
    guna_milan: [
      { name: "Varna",   boy_parameter: "Vaishya",  girl_parameter: "Vaishya", maximum_points: 1, obtained_points: 1, aspect: "Work" },
      { name: "Vasya",   boy_parameter: "Jalchar",  girl_parameter: "Jalchar", maximum_points: 2, obtained_points: 2, aspect: "Dominance" },
      { name: "Tara",    boy_parameter: "Sampat",   girl_parameter: "Sampat",  maximum_points: 3, obtained_points: 3, aspect: "Destiny" },
      { name: "Yoni",    boy_parameter: "Cow",      girl_parameter: "Cow",     maximum_points: 4, obtained_points: 4, aspect: "Mentality" },
      { name: "Maitri",  boy_parameter: "Venus",    girl_parameter: "Venus",   maximum_points: 5, obtained_points: 5, aspect: "Compatibility" },
      { name: "Gana",    boy_parameter: "Manushya", girl_parameter: "Manushya",maximum_points: 6, obtained_points: 6, aspect: "Guna Level" },
      { name: "Bhakoot", boy_parameter: "Gemini",   girl_parameter: "Gemini",  maximum_points: 7, obtained_points: 4, aspect: "Love compatibility" },
      { name: "Nadi",    boy_parameter: "Adi",      girl_parameter: "Madhya",  maximum_points: 8, obtained_points: 2, aspect: "Health" }
    ],
    total_score: 27,
    mangal_dosha_present: false
  },
  {
    guna_milan: [
      { name: "Varna",   boy_parameter: "Kshatriya",girl_parameter: "Vaishya", maximum_points: 1, obtained_points: 1, aspect: "Temperament" },
      { name: "Vasya",   boy_parameter: "Manav",    girl_parameter: "Vanchar", maximum_points: 2, obtained_points: 2, aspect: "Attraction" },
      { name: "Tara",    boy_parameter: "Vipat",    girl_parameter: "Kshema",  maximum_points: 3, obtained_points: 2, aspect: "Wellbeing" },
      { name: "Yoni",    boy_parameter: "Deer",     girl_parameter: "Elephant",maximum_points: 4, obtained_points: 2, aspect: "Sexual compatibility" },
      { name: "Maitri",  boy_parameter: "Mars",     girl_parameter: "Venus",   maximum_points: 5, obtained_points: 3, aspect: "Friendship" },
      { name: "Gana",    boy_parameter: "Rakshas",  girl_parameter: "Manushya",maximum_points: 6, obtained_points: 2, aspect: "Nature" },
      { name: "Bhakoot", boy_parameter: "Aries",    girl_parameter: "Scorpio", maximum_points: 7, obtained_points: 6, aspect: "Love compatibility" },
      { name: "Nadi",    boy_parameter: "Madhya",   girl_parameter: "Adi",     maximum_points: 8, obtained_points: 1, aspect: "Health" }
    ],
    total_score: 19,
    mangal_dosha_present: true
  },
  {
    guna_milan: [
      { name: "Varna",   boy_parameter: "Brahmin",  girl_parameter: "Brahmin", maximum_points: 1, obtained_points: 1, aspect: "Temperament" },
      { name: "Vasya",   boy_parameter: "Manav",    girl_parameter: "Manav",   maximum_points: 2, obtained_points: 2, aspect: "Attraction" },
      { name: "Tara",    boy_parameter: "Sadhak",   girl_parameter: "Sampat",  maximum_points: 3, obtained_points: 3, aspect: "Wellbeing" },
      { name: "Yoni",    boy_parameter: "Elephant", girl_parameter: "Elephant",maximum_points: 4, obtained_points: 4, aspect: "Sexual compatibility" },
      { name: "Maitri",  boy_parameter: "Moon",     girl_parameter: "Moon",    maximum_points: 5, obtained_points: 5, aspect: "Friendship" },
      { name: "Gana",    boy_parameter: "Devta",    girl_parameter: "Devta",   maximum_points: 6, obtained_points: 6, aspect: "Nature" },
      { name: "Bhakoot", boy_parameter: "Leo",      girl_parameter: "Sagittarius",maximum_points: 7,obtained_points:7,aspect:"Love compatibility" },
      { name: "Nadi",    boy_parameter: "Antya",    girl_parameter: "Madhya",  maximum_points: 8, obtained_points: 1, aspect: "Health" }
    ],
    total_score: 29,
    mangal_dosha_present: false
  },
  {
    guna_milan: [
      { name: "Varna",   boy_parameter: "Shudra",   girl_parameter: "Shudra",  maximum_points: 1, obtained_points: 1, aspect: "Temperament" },
      { name: "Vasya",   boy_parameter: "Vanchar",  girl_parameter: "Vanchar", maximum_points: 2, obtained_points: 2, aspect: "Attraction" },
      { name: "Tara",    boy_parameter: "Kshema",   girl_parameter: "Kshema",  maximum_points: 3, obtained_points: 2, aspect: "Wellbeing" },
      { name: "Yoni",    boy_parameter: "Dog",      girl_parameter: "Dog",     maximum_points: 4, obtained_points: 4, aspect: "Sexual compatibility" },
      { name: "Maitri",  boy_parameter: "Jupiter",  girl_parameter: "Jupiter", maximum_points: 5, obtained_points: 3, aspect: "Friendship" },
      { name: "Gana",    boy_parameter: "Manushya", girl_parameter: "Manushya",maximum_points: 6, obtained_points: 6, aspect: "Nature" },
      { name: "Bhakoot", boy_parameter: "Cancer",   girl_parameter: "Pisces",  maximum_points: 7, obtained_points: 6, aspect: "Love compatibility" },
      { name: "Nadi",    boy_parameter: "Adi",      girl_parameter: "Madhya",  maximum_points: 8, obtained_points: 1, aspect: "Health" }
    ],
    total_score: 25,
    mangal_dosha_present: false
  },
  {
    guna_milan: [
      { name: "Varna",   boy_parameter: "Kshatriya",girl_parameter: "Shudra",  maximum_points: 1, obtained_points: 0, aspect: "Temperament" },
      { name: "Vasya",   boy_parameter: "Chatuspad",girl_parameter: "Jalchar", maximum_points: 2, obtained_points: 1, aspect: "Attraction" },
      { name: "Tara",    boy_parameter: "Pratyari", girl_parameter: "Vipat",   maximum_points: 3, obtained_points: 1, aspect: "Wellbeing" },
      { name: "Yoni",    boy_parameter: "Cat",      girl_parameter: "Elephant",maximum_points: 4, obtained_points: 3, aspect: "Sexual compatibility" },
      { name: "Maitri",  boy_parameter: "Saturn",   girl_parameter: "Mars",    maximum_points: 5, obtained_points: 4, aspect: "Friendship" },
      { name: "Gana",    boy_parameter: "Rakshas",  girl_parameter: "Devta",   maximum_points: 6, obtained_points: 5, aspect: "Nature" },
      { name: "Bhakoot", boy_parameter: "Aries",    girl_parameter: "Capricorn",maximum_points:7, obtained_points:0,aspect:"Love compatibility" },
      { name: "Nadi",    boy_parameter: "Madhya",   girl_parameter: "Madhya",  maximum_points: 8, obtained_points: 1, aspect: "Health" }
    ],
    total_score: 15,
    mangal_dosha_present: true
  },

    {
      guna_milan: [
        { name: "Varna", boy_parameter: "Vaishya", girl_parameter: "Vaishya", maximum_points: 1, obtained_points: 1, aspect: "Temperament" },
        { name: "Vasya", boy_parameter: "Manav", girl_parameter: "Manav", maximum_points: 2, obtained_points: 2, aspect: "Attraction" },
        { name: "Tara", boy_parameter: "Sampat", girl_parameter: "Sampat", maximum_points: 3, obtained_points: 3, aspect: "Wellbeing" },
        { name: "Yoni", boy_parameter: "Horse", girl_parameter: "Horse", maximum_points: 4, obtained_points: 4, aspect: "Sexual compatibility" },
        { name: "Maitri", boy_parameter: "Mercury", girl_parameter: "Mercury", maximum_points: 5, obtained_points: 5, aspect: "Friendship" },
        { name: "Gana", boy_parameter: "Devta", girl_parameter: "Devta", maximum_points: 6, obtained_points: 6, aspect: "Nature" },
        { name: "Bhakoot", boy_parameter: "Leo", girl_parameter: "Sagittarius", maximum_points: 7, obtained_points: 7, aspect: "Love compatibility" },
        { name: "Nadi", boy_parameter: "Antya", girl_parameter: "Adi", maximum_points: 8, obtained_points: 0, aspect: "Health" }
      ],
      total_score: 28,
      mangal_dosha_present: false
    }
  ];
  

  // Auto-focus on first input of current step

  const usedIndexRef = useRef(null); // store index for current user
  
  useEffect(() => {
    const focusIndex = step === 1 ? 0 : 10;
    const timer = setTimeout(() => {
      inputRefs.current[focusIndex]?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, [step]);
  
  useEffect(() => {
    if (step === 4) {
      let selectedIndex;
  
      if (usedIndexRef.current === null) {
        // Pick a new random result for new user
        selectedIndex = Math.floor(Math.random() * dummyResults.length);
        usedIndexRef.current = selectedIndex;
      } else {
        // Reuse the stored index
        selectedIndex = usedIndexRef.current;
      }
  
      const result = dummyResults[selectedIndex];
  
      setMatchResult({
        guna_milan: result.guna_milan,
        total_score: result.total_score,
        mangal_dosha_present: result.mangal_dosha_present
      });
      setGunaData(result.guna_milan);
      setTotalPoints(result.total_score);
      setMangalDosha(result.mangal_dosha_present);
    }
  }, [step]);
  

  const handleChange = (e, index, gender) => {
    const { name, value } = e.target;
    const updatedData = gender === 'boy' ? { ...boyData, [name]: value } : { ...girlData, [name]: value };
    gender === 'boy' ? setBoyData(updatedData) : setGirlData(updatedData);

    const maxLength = name === 'year' ? 4 : 2;
    if (autoTabFields.includes(name) && value.length >= maxLength) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const isDataComplete = (data) =>
    ['day', 'month', 'year', 'hour', 'minute', 'second', 'birthPlace'].every(
      (field) => data[field]?.trim() !== ''
    );

  // For this demo, instead of calling the backend API, we simulate the match result using dummy data.
  // If API call is needed, replace handleMatchKundli with the axios call.
  const handleMatchKundli = async () => {
    if (!isDataComplete(boyData) || !isDataComplete(girlData)) {
      setError("⚠️ Please fill in all required birth details.");
      return;
    }
    // Skip API call and move to result screen (dummy data already set by useEffect)
    setStep(4);
  };

  const sectionStyle = "bg-gradient-to-br from-orange-50 via-white to-orange-100 shadow-xl rounded-2xl p-6 md:p-10 space-y-4 w-full max-w-3xl mx-auto mt-10 animate-fade-in";
  const inputStyle = "w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 bg-white shadow-sm";
  const labelStyle = "text-sm font-semibold text-gray-700 mb-1";

  const renderForm = (gender, data, offset) => (
    <form onSubmit={(e) => { e.preventDefault(); setStep(step + 1); }} className={sectionStyle}>
      <h2 className="text-3xl font-extrabold text-center text-orange-600 tracking-wide mb-6">
        {gender === 'boy' ? "👦 Enter Boy's Details" : "👧 Enter Girl's Details"}
      </h2>

      <div className="space-y-4">
        <div>
          <label className={labelStyle}>Full Name</label>
          <input
            name="name"
            value={data.name}
            onChange={(e) => handleChange(e, offset, gender)}
            ref={el => inputRefs.current[offset] = el}
            className={inputStyle}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {['day', 'month', 'year'].map((field, i) => (
            <div key={field}>
              <label className={labelStyle}>{field}</label>
              <input
                type="number"
                name={field}
                value={data[field]}
                onChange={(e) => handleChange(e, offset + i + 1, gender)}
                ref={el => inputRefs.current[offset + i + 1] = el}
                className={inputStyle}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {['hour', 'minute', 'second'].map((field, i) => (
            <div key={field}>
              <label className={labelStyle}>{field}</label>
              <input
                type="number"
                name={field}
                value={data[field]}
                onChange={(e) => handleChange(e, offset + i + 4, gender)}
                ref={el => inputRefs.current[offset + i + 4] = el}
                className={inputStyle}
              />
            </div>
          ))}
        </div>

        <div>
          <label className={labelStyle}>Birth Place</label>
          <input
            name="birthPlace"
            value={data.birthPlace}
            onChange={(e) => handleChange(e, offset + 7, gender)}
            ref={el => inputRefs.current[offset + 7] = el}
            className={inputStyle}
          />
        </div>

        <button type="submit" className="w-full mt-6 bg-orange-500 text-white text-lg font-bold py-2 rounded-lg shadow hover:bg-orange-600 transition-all">
          Next Step ➜
        </button>
      </div>
    </form>
  );

  return (
    <div className="relative bg-orange-50 min-h-screen p-4 md:p-6">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 border-solid"></div>
        </div>
      )}

      {/* Stepper */}
      <div className="flex justify-center gap-4 mb-6">
        {[1, 2, 3, 4].map(n => (
          <div key={n} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
            step === n ? 'bg-orange-500 text-white scale-110 shadow-xl' : 'bg-white text-gray-500 border-2 border-orange-200'
          }`}>
            {n}
          </div>
        ))}
      </div>

      {/* Steps */}
      {step === 1 && renderForm('boy', boyData, 0)}
      {step === 2 && renderForm('girl', girlData, 10)}

      {step === 3 && (
        <div className={`${sectionStyle} text-center`}>
          <h2 className="text-3xl font-bold text-green-600">✅ Details Captured!</h2>
          <button onClick={handleMatchKundli} className="mt-4 bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition">
            Match Kundli
          </button>
          {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
        </div>
      )}

      {step === 4 && matchResult && (
        <div className="space-y-6 relative">
          <div className="absolute right-4 top-0 z-10">
            <button onClick={() => navigate('/dashboard')} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-4 py-2 rounded-full shadow-md transition">
              🚀 Go to Dashboard
            </button>
          </div>

          {/* Birth Details */}
          <div className={sectionStyle}>
            <h3 className="text-xl font-bold text-orange-600 mb-3">📜 Birth Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {[{ gender: 'Boy', data: boyData }, { gender: 'Girl', data: girlData }].map(({ gender, data }) => (
                <div key={gender}>
                  <p><strong>{gender}:</strong> {data.name}</p>
                  <p>{`${data.day}/${data.month}/${data.year} ${data.hour}:${data.minute}:${data.second}`}</p>
                  <p>{data.birthPlace}</p>
                </div>
              ))}
            </div>
          </div>
{/* Guna Milan Table */}
<div className={sectionStyle}>
  <h3 className="text-xl font-bold text-orange-600 mb-3">💫 Guna Milan Results</h3>
  <table className="w-full table-auto text-sm">
    <thead>
      <tr className="bg-orange-100 text-left">
        <th className="p-2">Guna</th>
        <th className="p-2">Boy</th>
        <th className="p-2">Girl</th>
        <th className="p-2">Max</th>
        <th className="p-2">Points</th>
        <th className="p-2">Life Area</th>
      </tr>
    </thead>
    <tbody>
      {gunaData.map((g, i) => (
        <tr key={i} className="border-t">
          <td className="p-2 text-red-600 font-medium">{g.name}</td>
          <td className="p-2">{g.boy_parameter}</td>
          <td className="p-2">{g.girl_parameter}</td>
          <td className="p-2">{g.maximum_points}</td>
          <td className="p-2 font-bold">{g.obtained_points}</td>
          <td className="p-2">{g.aspect}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


          {/* Summary + CTA */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className={sectionStyle}>
              <h4 className="text-lg font-bold text-yellow-600 mb-2">📊 Matching Summary</h4>
              <p>Total Points: <strong>{totalPoints} / 36</strong></p>
              <p>Mangal Dosha: <span className={`font-bold ${mangalDosha ? 'text-red-600' : 'text-green-600'}`}>{mangalDosha ? 'Yes' : 'No'}</span></p>
              {totalPoints < 18 || mangalDosha ? (
                <p className="mt-2 font-semibold text-red-600">⚠️ Marriage not recommended.</p>
              ) : (
                <p className="mt-2 font-semibold text-green-600">✅ Kundlis are well matched!</p>
              )}
            </div>
            <div className={sectionStyle + " text-center"}>
              <h4 className="text-lg font-bold text-yellow-600 mb-2">🔮 Want a Personal Consultation?</h4>
              <div className="text-3xl font-extrabold text-orange-500 mb-2">{totalPoints} / 36</div>
              <button onClick={() => navigate('/chat-with-astrologer')} className="bg-orange-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-600 transition">
                Talk to Astrologer
              </button>
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

