import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Switch,
  TextField,
  IconButton,
  Tooltip,
  Snackbar,
} from "@mui/material";
import {
  Share,
  Brightness4,
  Brightness7,
  VolumeUp,
  StopCircle,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";

const HoroscopePage = () => {
  const [sign, setSign] = useState("aries");
  const [prediction, setPrediction] = useState({ english: "", hindi: "" });
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("english");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [darkMode, setDarkMode] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);
  const speechRef = useRef(null);

  const zodiacData = {
    aries: { english: "Aries", hindi: "मेष", icon: "♈" },
    taurus: { english: "Taurus", hindi: "वृषभ", icon: "♉" },
    gemini: { english: "Gemini", hindi: "मिथुन", icon: "♊" },
    cancer: { english: "Cancer", hindi: "कर्क", icon: "♋" },
    leo: { english: "Leo", hindi: "सिंह", icon: "♌" },
    virgo: { english: "Virgo", hindi: "कन्या", icon: "♍" },
    libra: { english: "Libra", hindi: "तुला", icon: "♎" },
    scorpio: { english: "Scorpio", hindi: "वृश्चिक", icon: "♏" },
    sagittarius: { english: "Sagittarius", hindi: "धनु", icon: "♐" },
    capricorn: { english: "Capricorn", hindi: "मकर", icon: "♑" },
    aquarius: { english: "Aquarius", hindi: "कुंभ", icon: "♒" },
    pisces: { english: "Pisces", hindi: "मीन", icon: "♓" },
  };

  const fetchHoroscope = useCallback(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/horoscope/${sign}?date=${date}`)
      .then((res) => {
        if (res.data.success) {
          setPrediction({
            english: res.data.prediction || "Horoscope not available.",
            hindi: res.data.prediction_hindi || "हिंदी अनुवाद उपलब्ध नहीं है।",
          });
        } else {
          setPrediction({
            english: "Horoscope not found.",
            hindi: "राशिफल नहीं मिला।",
          });
        }
      })
      .catch(() => {
        setPrediction({
          english: "Error fetching horoscope.",
          hindi: "राशिफल लाने में त्रुटि।",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sign, date]);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      loadVoices();
    };
  }, []);

  const speak = () => {
    const message = language === "hindi" ? prediction.hindi : prediction.english;
    const utterance = new SpeechSynthesisUtterance(message);

    const selectedVoice = availableVoices.find((voice) =>
      language === "hindi"
        ? voice.lang.toLowerCase().includes("hi")
        : voice.lang.toLowerCase().includes("en")
    );

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.lang = language === "hindi" ? "hi-IN" : "en-US";
    utterance.onend = () => setSpeaking(false);
    speechRef.current = utterance;
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const sharePrediction = () => {
    navigator.clipboard.writeText(`${prediction.english}\n\n${prediction.hindi}`);
    setShowToast(true);
  };

  useEffect(() => {
    document.title = `${zodiacData[sign].english} Horoscope - Astro`;
  }, [sign]);

  const maxDate = new Date().toISOString().split("T")[0];

  return (
    <div
      style={{
        ...styles.container,
        background: darkMode
          ? "linear-gradient(145deg, #0f0f17, #1c1c2e)"
          : "linear-gradient(145deg, #e6e6f0, #ffffff)",
        color: darkMode ? "#ffffff" : "#000000",
      }}
    >
      <motion.h1 style={styles.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        ✨ AstroMeet Horoscope
      </motion.h1>

      <div style={styles.topBar}>
        <Tooltip title="Toggle Theme">
          <IconButton onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Brightness7 style={{ color: "#FFD700" }} /> : <Brightness4 />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Copy Prediction">
          <IconButton onClick={sharePrediction}>
            <Share style={{ color: darkMode ? "#fff" : "#000" }} />
          </IconButton>
        </Tooltip>

        <Tooltip title={speaking ? "Stop Speaking" : "Speak Horoscope"}>
          <IconButton onClick={speaking ? stopSpeaking : speak}>
            {speaking ? (
              <StopCircle style={{ color: "#ff4d4d" }} />
            ) : (
              <VolumeUp style={{ color: darkMode ? "#fff" : "#000" }} />
            )}
          </IconButton>
        </Tooltip>
      </div>

      <div style={styles.switcher}>
        <span>English</span>
        <Switch
          checked={language === "hindi"}
          onChange={() => setLanguage(language === "english" ? "hindi" : "english")}
        />
        <span>हिंदी</span>
      </div>

      <div style={styles.selector}>
        <Select value={sign} onChange={(e) => setSign(e.target.value)} style={styles.select}>
          {Object.keys(zodiacData).map((s) => (
            <MenuItem key={s} value={s}>
              {zodiacData[s].icon} {zodiacData[s].english} / {zodiacData[s].hindi}
            </MenuItem>
          ))}
        </Select>

        <TextField
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.datePicker}
          inputProps={{ max: maxDate }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={fetchHoroscope}
          disabled={loading}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "10px",
            cursor: "pointer",
            backgroundColor: darkMode ? "#FFD700" : "#000",
            color: darkMode ? "#000" : "#fff",
            border: "none",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease-in-out",
          }}
        >
          {loading ? "Loading..." : "🔮 Generate Horoscope"}
        </button>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card
          style={{
            ...styles.card,
            background: darkMode ? "rgba(255, 255, 255, 0.05)" : "#ffffff",
            color: darkMode ? "#fff" : "#000",
            backdropFilter: "blur(15px)",
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {zodiacData[sign].icon} {zodiacData[sign][language]}
            </Typography>

            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <Typography variant="body1" style={{ fontSize: "18px", lineHeight: 1.6 }}>
                {prediction[language]}
              </Typography>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <Snackbar
        open={showToast}
        autoHideDuration={2500}
        onClose={() => setShowToast(false)}
        message="Prediction copied to clipboard!"
      />
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    minHeight: "100vh",
    transition: "all 0.4s ease-in-out",
    background: "linear-gradient(135deg, #1f1c2c, #928dab)",
  },
  title: {
    fontSize: "36px",
    marginBottom: "24px",
    fontWeight: "bold",
    color: "#FFD700",
    textShadow: "0px 2px 10px rgba(255,215,0,0.6)",
  },
  topBar: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "15px",
  },
  switcher: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "20px",
    fontWeight: "500",
  },
  selector: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  select: {
    minWidth: 180,
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "8px 12px",
    fontWeight: "bold",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    border: "none",
  },
  datePicker: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "8px 12px",
    fontWeight: "bold",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    border: "none",
  },
  card: {
    width: "92%",
    maxWidth: "460px",
    margin: "0 auto",
    borderRadius: "20px",
    padding: "24px",
    backgroundColor: "#2a2a3b",
    color: "#fff",
    boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
    transition: "transform 0.3s ease",
  },
};

export default HoroscopePage;
