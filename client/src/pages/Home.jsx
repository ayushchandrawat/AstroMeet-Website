import React, { useState } from "react";
// import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; 
import "@fortawesome/fontawesome-free/css/all.min.css";
// import logo from "client/public/logo.png"; 
const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const term = searchTerm.toLowerCase().trim();
    if (term.includes("home")) navigate("/");
    else if (term.includes("calendar") || term.includes("hindu")) window.location.href = "https://panchang.astrosage.com/";
    else if (term.includes("dashboard")) navigate("/login");
    else if (term.includes("footer")) window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    else if (term.includes("horoscope")) navigate("/login");
    else if (term.includes("chat")) navigate("/login");
    else if (term.includes("kundli")) navigate("/login");
    else if (term.includes("profile")) navigate("/login");
    else {
      alert("Page not found ! 😢");
  }
            setSearchTerm("");
  };

  return (
    <main>
      
      {/* Hero Section */}
      <div className="heroContainer">
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
  <div style={{ display: "flex", alignItems: "center", gap: "35px" ,marginBottom:"18px"}}>
    <img 
      src="/logo.png" 
      alt="AstroMeet" 
      style={{ height: "200px", width: "180px", objectFit: "contain" }} 
    />            
          <div className="links">
            <i className="fa-solid fa-bars-staggered"></i>
              <a href="/">Home</a> 
            <a href="https://panchang.astrosage.com/">
              Hindu calendar <i className="fa-solid fa-caret-down"></i>
            </a>
            <a href="/login">Dashboard</a>  
          </div>
          </div>
          <div className="signUps">
          <input
              type="text"
              name="search"
              placeholder=" 🔍 Search.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />   
        
             <button id="Login" onClick={() => navigate("/login")}>User</button>
             <button id="Login" onClick={() => navigate("/admin")}>Admin</button>
            <button id="signIn" onClick={() => navigate("/register")}>Sign up</button>

          </div>
        </nav>

        <div className="hero">
          <h2>Welcome to AstroMeet !</h2>
          <h1>Unlock your Destiny with <br /> Personalized Astrology</h1>
          <p>Get insights, guidance, and predictions to improve your life !</p>
          <button id="signIN">Get started</button>
        </div>
      </div>

      {/* Scroller Section */}
      <div className="scrollerContainer">
        <div className="scroller">
          {[
            { img: "https://www.astrosage.com/images/products/rudraksha.jpg", label: "Rudraksha" },
            { img: "https://cdn.astrosage.com/images/product-images/rudraksha-mala.jpg", label: "Mala"},
            { img: "https://www.astrosage.com/images/products/fengshui.jpg", label: "Feng Shui" },
            { img: "https://www.astrosage.com/images/products/yantra.jpg", label: "Yantras" },
            { img: "https://www.astrosage.com/images/products/gemstone.jpg", label: "Gemstones" },
            { img: "https://www.astrosage.com/images/products/rudraksha-mala-kantha.jpg",label:"Rudraksha-Mala"},
            { img: "https://cdn.astrosage.com/images/product-images/dhatoore-ki-jad.jpg", label: "Dhatoore-ki-jad" },
            { img: "https://cdn.astrosage.com/images/product-images/red-coral.jpg", label: "Red-coral" },

          ].map((item, index) => (
            <div className="elem" key={index}>
              {item.isVideo ? (
                <video src={item.img} autoPlay loop muted></video>
              ) : (
                <img src={item.img} alt={item.label} />
              )}
              <div className="overlay">
                <div><span>{item.label}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Designs Section */}
      <section>
        <h2>Explore inspiring designs</h2>
        <div className="designs">
          {[
            // { img: "https://media.istockphoto.com/id/1621770654/photo/", label: "Zodiac Wheel" },
            { img: "https://www.shutterstock.com/shutterstock/videos/1098546645/thumb/1.jpg?ip=x480", label: "Birth Chart" },
            // { img: "https://media.istockphoto.com/id/482954331/photo/solar-system.jpg", label: "Solar System" },
            { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScwUUS8w9RKuCcNQv2L_CtS0lkrBfIz8Swlw&s", label: "Orbital Rings" },
            { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfREn4PMc0-LXtsE2amMpYIV6pWDHIznUovw&s", label: "Solar & Lunar Eclipses" },
            { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb-MeNOkKN9mXD3LZd6qg-73UeVnYKu1Cp-Q&s", label: "Space View" },
            { img: "https://t4.ftcdn.net/jpg/05/27/82/49/240_F_527824903_o3NOqwVIPABypBDt3fNIux6y4s5h1CaC.jpg", label: "Star Maps & Constellations" },
            { img: "https://img.freepik.com/free-photo/magical-fantasy-black-hole-illustration_23-2151678388.jpg", label: "Astrology Fusion" },
            { img: "https://t3.ftcdn.net/jpg/10/07/00/50/240_F_1007005079_w5TmC93pFIshFoLUsg7jEnYb0Y2JEyOP.jpg", label: "Time Cycle" },
            { img: "https://t3.ftcdn.net/jpg/05/64/28/42/240_F_564284291_2S0U4caPgpdcw8KNHCsLvX23kGwgDs4l.jpg", label: "Spiritual Flow" },
            { img: "https://t3.ftcdn.net/jpg/05/64/23/78/240_F_564237803_1zjswEnLB0Ss2C29xXuaXNZ4KZPxXwFt.jpg", label: "Star Wheel" },
          ].map((item, index) => (
            <div className="box" key={index}>
              <div className="boxImg">
                <img src={item.img} alt={item.label} />
                <div className="hover">
                  <h6>{item.label}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button id="explore">Browse more inspiration</button>
      </section>

      {/* Zodiac Sign Footer Scroller */}
      <div className="footerScroller">
  <div className="wrapper">
    <div className="scroller">
      {[
        { sign: "aries", label: "Aries (मेष)" },
        { sign: "taurus", label: "Taurus (वृषभ)" },
        { sign: "gemini", label: "Gemini (मिथुन)" },
        { sign: "cancer", label: "Cancer (कर्क)" },
        { sign: "leo", label: "Leo (सिंह)" },
        { sign: "virgo", label: "Virgo (कन्या)" },
        { sign: "libra", label: "Libra (तुला)" },
        { sign: "scorpio", label: "Scorpio (वृश्चिक)" },
        { sign: "sagittarius", label: "Sagittarius (धनु)" },
        { sign: "capricorn", label: "Capricorn (मकर)" },
        { sign: "aquarius", label: "Aquarius (कुंभ)" },
        { sign: "pisces", label: "Pisces (मीन)" },
      ].map((item, index) => (
        <div className="wrapperContainer" key={index}>
          <img src={`https://www.astrosage.com/images/sign/${item.sign}.png`} alt={item.sign} />
          <span className="zodiacName">{item.label}</span>
        </div>
      ))}

      {/* Duplicate for seamless scrolling */}
      {[
        { sign: "aries", label: "Aries (मेष)" },
        { sign: "taurus", label: "Taurus (वृषभ)" },
        { sign: "gemini", label: "Gemini (मिथुन)" },
        { sign: "cancer", label: "Cancer (कर्क)" },
        { sign: "leo", label: "Leo (सिंह)" },
        { sign: "virgo", label: "Virgo (कन्या)" },
        { sign: "libra", label: "Libra (तुला)" },
        { sign: "scorpio", label: "Scorpio (वृश्चिक)" },
        { sign: "sagittarius", label: "Sagittarius (धनु)" },
        { sign: "capricorn", label: "Capricorn (मकर)" },
        { sign: "aquarius", label: "Aquarius (कुंभ)" },
        { sign: "pisces", label: "Pisces (मीन)" },
      ].map((item, index) => (
        <div className="wrapperContainer" key={`duplicate-${index}`}>
          <img src={`https://www.astrosage.com/images/sign/${item.sign}.png`} alt={item.sign} />
          <span className="zodiacName">{item.label}</span>
        </div>
      ))}
    </div>
  </div>
</div>

    

      {/* Footer Section */}
      <footer>
        <div className="footer-part2">

          <div>

            <span>&copy; 2024 AstroMeet</span>
            <span>Terms</span>
            <span>Privacy</span>
            <span>Cookies</span>
            
          </div>
          <p className="tagline">Bringing the Stars Closer to You ✨</p>
         
        </div>
        <div className="h1">    
            <h1>🔮 AstroMeet. All Rights Reserved.</h1>
          </div>
      </footer>
    </main>
  );
};

  
export default Home;
