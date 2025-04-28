import React, { useState } from "react";
import { FaStar, FaSearch, FaSortAmountDown, FaFilter } from "react-icons/fa";

const ChatHeader = ({ language, setLanguage }) => {
  return (
    <header className="bg-white shadow-sm py-2">
 <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between mb-0 ">      
    <img
          src="/image.png"
          alt="AstroMeet"
          style={{ height: "155px", width: "auto", objectFit: "contain", display: "block"  }}
        />
        <nav className="hidden md:flex items-center gap-8 text-gray-700 text-base font-medium ml-auto mr-6">
          <a href="/kundlipage" className="hover:text-yellow-600">Free Kundli</a>
          <a href="/horoscope" className="hover:text-yellow-600">Horoscopes</a>
          <a href="/chat-with-astrologer" className="hover:text-yellow-600">Chat with Astrologer</a>
        </nav>
        <div className="flex items-center gap-6">
          <div className="relative">
            <select
              className="text-base bg-transparent focus:outline-none cursor-pointer"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>Eng</option>
              <option>Hindi</option>
            </select>
          </div>
          <button className="flex items-center gap-2 bg-yellow-400 px-4 py-2 text-base rounded-full font-medium">
            <a href="/dashboard">👤 Log out</a>
          </button>
        </div>
      </div>
      <div className="bg-yellow-400 text-black font-semibold py-2 px-4  mt-0 text-center text-lg w-full ">
Chat with Astrologer
</div>

    </header>
    
  );
};
const astrologers = [
  {
    name: "Sharvi",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    specialization: "Numerology, Tarot",
    languages: ["Hindi", "English"],
    rating: 4.5,
    orders: 1880,
    experience: 6,
    price: 23,
    status: "online",
  },
  {
    name: "Muskan",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    specialization: "Tarot, Psychology",
    languages: ["English", "Hindi"],
    rating: 4.9,
    orders: 5157,
    experience: 8,
    price: 40,
    status: "offline",
    waitTime: "5m",
  },
  {
    name: "Aryan",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    specialization: "Vedic Astrology, Numerology",
    languages: ["Hindi"],
    rating: 4.6,
    orders: 1320,
    experience: 5,
    price: 18,
    status: "online",
  },
  {
    name: "Ishita",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    specialization: "Tarot, Reiki",
    languages: ["English", "Gujarati"],
    rating: 4.3,
    orders: 890,
    experience: 3,
    price: 30,
    status: "online",
  },
  {
    name: "Rohit",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    specialization: "Palmistry, Numerology",
    languages: ["Hindi", "English"],
    rating: 4.7,
    orders: 2040,
    experience: 7,
    price: 35,
    status: "offline",
    waitTime: "10m",
  },
  {
    name: "Simran",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    specialization: "Love Astrology, Tarot",
    languages: ["Hindi"],
    rating: 4.8,
    orders: 3900,
    experience: 9,
    price: 28,
    status: "online",
  },
  {
    name: "Karan",
    image: "https://randomuser.me/api/portraits/men/25.jpg",
    specialization: "Kundli Matching, Numerology",
    languages: ["English", "Punjabi"],
    rating: 4.4,
    orders: 2750,
    experience: 6,
    price: 22,
    status: "offline",
    waitTime: "3m",
  },
  {
    name: "Neha",
    image: "https://randomuser.me/api/portraits/women/27.jpg",
    specialization: "Tarot, Reiki Healing",
    languages: ["Hindi", "English"],
    rating: 4.9,
    orders: 5020,
    experience: 10,
    price: 45,
    status: "online",
  },
  {
    name: "Manoj",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
    specialization: "Face Reading, Palmistry",
    languages: ["Hindi"],
    rating: 4.1,
    orders: 1350,
    experience: 4,
    price: 15,
    status: "online",
  },
  {
    name: "Aarti",
    image: "https://randomuser.me/api/portraits/women/66.jpg",
    specialization: "Numerology, Career",
    languages: ["English", "Hindi"],
    rating: 4.6,
    orders: 2500,
    experience: 5,
    price: 25,
    status: "offline",
    waitTime: "7m",
  },
  {
    name: "Yash",
    image: "https://randomuser.me/api/portraits/men/30.jpg",
    specialization: "Tarot, Career Advice",
    languages: ["English", "Hindi"],
    rating: 4.7,
    orders: 3300,
    experience: 6,
    price: 32,
    status: "online",
  },
  {
    name: "Ritika",
    image: "https://randomuser.me/api/portraits/women/48.jpg",
    specialization: "Love, Tarot",
    languages: ["Hindi", "English"],
    rating: 4.2,
    orders: 1100,
    experience: 3,
    price: 19,
    status: "offline",
    waitTime: "2m",
  },
  {
    name: "Dev",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    specialization: "Spiritual Healing, Vastu",
    languages: ["Hindi"],
    rating: 4.4,
    orders: 2200,
    experience: 7,
    price: 26,
    status: "online",
  },
  {
    name: "Nisha",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    specialization: "Numerology, Health",
    languages: ["English", "Hindi"],
    rating: 4.8,
    orders: 4200,
    experience: 9,
    price: 36,
    status: "online",
  },
  {
    name: "Priya",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
    specialization: "Love, Psychology",
    languages: ["Hindi", "English"],
    rating: 4.6,
    orders: 3000,
    experience: 8,
    price: 35,
    status: "online",
  },
  {
    name: "Varun",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    specialization: "Face Reading, Tarot",
    languages: ["English", "Hindi"],
    rating: 4.1,
    orders: 1700,
    experience: 4,
    price: 21,
    status: "online",
  },
  {
    name: "Divya",
    image: "https://randomuser.me/api/portraits/women/77.jpg",
    specialization: "Numerology, Vastu",
    languages: ["English", "Hindi"],
    rating: 4.9,
    orders: 5200,
    experience: 10,
    price: 50,
    status: "offline",
    waitTime: "4m",
  },
  {
    name: "Abhay",
    image: "https://randomuser.me/api/portraits/men/63.jpg",
    specialization: "Career, Finance",
    languages: ["Hindi", "English"],
    rating: 4.0,
    orders: 950,
    experience: 2,
    price: 12,
    status: "offline",
    waitTime: "15m",
  },
  {
    name: "Nandini",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    specialization: "Marriage, Kundli",
    languages: ["Hindi"],
    rating: 4.5,
    orders: 2100,
    experience: 6,
    price: 27,
    status: "online",
  },
  {
    name: "Arjun",
    image: "https://randomuser.me/api/portraits/men/43.jpg",
    specialization: "Numerology, Career",
    languages: ["English"],
    rating: 4.3,
    orders: 1850,
    experience: 5,
    price: 24,
    status: "offline",
    waitTime: "8m",
  },
];


import { useNavigate } from "react-router-dom"; // 👈 make sure this is at the top

const AstrologerCard = ({ astro }) => {
  const navigate = useNavigate(); 

  const handleChatClick = () => {
    // navigate to dynamic chat route
    navigate(`/chat/`);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        <img
          src={astro.image}
          alt={astro.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{astro.name}</h2>
          <p className="text-gray-500 text-sm">{astro.specialization}</p>
          <div className="flex items-center text-sm mt-1">
            <FaStar className="text-yellow-500 mr-1" />
            <span>{astro.rating} ({astro.orders} orders)</span>
          </div>
          <p className="text-sm text-gray-600">Exp: {astro.experience} Years</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            astro.status === "online"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {astro.status === "online" ? "Online" : `Wait - ${astro.waitTime}`}
        </span>
        <button
          onClick={handleChatClick}
          className="bg-yellow-400 px-4 py-1 rounded-md font-medium hover:bg-yellow-500 transition"
        >
          Chat
        </button>
      </div>
    </div>
  );
};


const ChatWithAstrologerPage = () => {
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("Eng");
  const [sortBy, setSortBy] = useState("default");
  const [filterOnline, setFilterOnline] = useState(false);

  const filteredAstrologers = astrologers
    .filter((astro) => astro.name.toLowerCase().includes(search.toLowerCase()))
    .filter((astro) => !filterOnline || astro.status === "online")
    .sort((a, b) => {
      if (sortBy === "experience") return b.experience - a.experience;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price") return a.price - b.price;
      return 0;
    });

  return (
    <div className="bg-gray-50 min-h-screen">
      <ChatHeader language={language} setLanguage={setLanguage} />

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
          <div className="flex gap-3">
            <button
              onClick={() => setFilterOnline((prev) => !prev)}
              className={`border px-4 py-2 rounded text-sm flex items-center gap-2 ${
                filterOnline ? "bg-yellow-100" : ""
              }`}
            >
              <FaFilter className="text-gray-600" /> {filterOnline ? "Online Only" : "Filter"}
            </button>

            <select
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-4 py-2 rounded text-sm"
            >
              <option value="default">Sort By</option>
              <option value="experience">Experience</option>
              <option value="rating">Rating</option>
              <option value="price">Price</option>
            </select>
          </div>
          <div className="flex items-center border rounded overflow-hidden w-full max-w-xs">
            <input
              type="text"
              placeholder="Search name..."
              className="px-4 py-3 outline-none text-sm w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-yellow-400 px-4 py-3">
              <FaSearch className="text-black text-lg" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredAstrologers.map((astro, i) => (
            <AstrologerCard astro={astro} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatWithAstrologerPage;
