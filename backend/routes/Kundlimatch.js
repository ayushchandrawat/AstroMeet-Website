const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const VEDIC_ASTRO_API_KEY = process.env.VEDIC_ASTRO_API_KEY;

// Default Khandwa coordinates
const defaultLat = 21.8312;
const defaultLon = 76.3497;

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Use POST method to perform Kundli matching.' });
});

router.post('/kundlimatch', async (req, res) => {
  try {
    const { boyData, girlData } = req.body;

    if (!boyData || !girlData) {
      return res.status(400).json({ success: false, error: "Missing boy or girl data" });
    }

    const queryParams = {
      api_key: VEDIC_ASTRO_API_KEY,
      boy_dob: `${boyData.day}/${boyData.month}/${boyData.year}`,
      boy_tob: `${boyData.hour}:${boyData.minute}`,
      boy_tz: 5.5,
      boy_lat: boyData.latitude || defaultLat,
      boy_lon: boyData.longitude || defaultLon,
      girl_dob: `${girlData.day}/${girlData.month}/${girlData.year}`,
      girl_tob: `${girlData.hour}:${girlData.minute}`,
      girl_tz: 5.5,
      girl_lat: girlData.latitude || defaultLat,
      girl_lon: girlData.longitude || defaultLon,
      lang: "en"
    };

    const apiURL ='https://api.vedicastroapi.com/v3-json/matching/ashtakoot';

    const response = await axios.post(apiURL, queryParams, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return res.status(200).json({
      success: true,
      boyName: boyData.name || '',
      girlName: girlData.name || '',
      data: response.data
    });

  } catch (error) {
    console.error('❌ Kundli Match Error:', {
      status: error?.response?.status,
      data: error?.response?.data,
      message: error.message
    });

    return res.status(error?.response?.status || 500).json({
      success: false,
      error: error?.response?.data?.message || 'Server error occurred. Please try again.'
    });
  }
});

module.exports = router;













