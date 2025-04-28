import { useEffect, useState } from "react";
import axios from "axios";
import {
    Container, Typography, Avatar, Button, TextField, Switch,
    FormControlLabel, Box, CircularProgress, Paper, Grid,
    Select, MenuItem, FormControl, InputLabel
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// ✅ Zodiac signs: English + Hindi
const zodiacSigns = [
    { value: "Aries", label: "♈ Aries (मेष)" },
    { value: "Taurus", label: "♉ Taurus (वृष)" },
    { value: "Gemini", label: "♊ Gemini (मिथुन)" },
    { value: "Cancer", label: "♋ Cancer (कर्क)" },
    { value: "Leo", label: "♌ Leo (सिंह)" },
    { value: "Virgo", label: "♍ Virgo (कन्या)" },
    { value: "Libra", label: "♎ Libra (तुला)" },
    { value: "Scorpio", label: "♏ Scorpio (वृश्चिक)" },
    { value: "Sagittarius", label: "♐ Sagittarius (धनु)" },
    { value: "Capricorn", label: "♑ Capricorn (मकर)" },
    { value: "Aquarius", label: "♒ Aquarius (कुंभ)" },
    { value: "Pisces", label: "♓ Pisces (मीन)" },
];

const genderOptions = [
    { value: "Male", label: "👨 Male" },
    { value: "Female", label: "👩 Female" },
    { value: "Other", label: "⚧ Other" },
];

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editing, setEditing] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({});
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No token found");

                const { data } = await axios.get("http://localhost:5000/api/user/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setProfile(data.user);
                setUpdatedProfile(data.user);
            } catch (error) {
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result);
            reader.readAsDataURL(file);
            setImageFile(file);
        }
    };

    const handleChange = (e) => {
        setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token found");

            const formData = new FormData();
            formData.append("name", updatedProfile.name);
            formData.append("email", updatedProfile.email);
            formData.append("phone", updatedProfile.phone);
            formData.append("zodiac", updatedProfile.zodiac);
            formData.append("birthDate", updatedProfile.birthDate);
            formData.append("gender", updatedProfile.gender);
            if (imageFile) formData.append("avatar", imageFile);

            await axios.put("http://localhost:5000/api/user/updateProfile", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setProfile(updatedProfile);
            setEditing(false);
            alert("Profile Updated Successfully! ✅");
        } catch (error) {
            console.error("Update Failed:", error);
            alert("Failed to update profile ❌");
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ backgroundColor: darkMode ? "#121212" : "#f4f4f4", minHeight: "100vh", py: 5 }}>
                <Container maxWidth="sm">
                    <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
                        <FormControlLabel
                            control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
                            label="Dark Mode"
                        />

                        {loading ? (
                            <CircularProgress />
                        ) : error ? (
                            <Typography color="error">{error}</Typography>
                        ) : (
                            <>
                                <label htmlFor="upload-photo">
                                    <input
                                        type="file"
                                        id="upload-photo"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={handleImageUpload}
                                    />
                                    <Avatar
                                        src={image || profile.avatar || "https://via.placeholder.com/150"}
                                        alt="Profile"
                                        sx={{
                                            width: 120, height: 120, mx: "auto",
                                            cursor: "pointer", mb: 2
                                        }}
                                    />
                                </label>

                                <Typography variant="h5" fontWeight="bold">
                                    🫡 Welcome : {profile.name} !
                                </Typography>

                                <Grid container spacing={2} sx={{ mt: 2 }}>
                                    {/* Name */}
                                    <Grid item xs={12}>
                                        {editing ? (
                                            <TextField
                                                fullWidth
                                                label="Name"
                                                name="name"
                                                value={updatedProfile.name || ""}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            <Typography><b>Name:</b> {updatedProfile.name}</Typography>
                                        )}
                                    </Grid>

                                    {/* Email */}
                                    <Grid item xs={12}>
                                        {editing ? (
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                value={updatedProfile.email || ""}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            <Typography><b>Email:</b> {updatedProfile.email}</Typography>
                                        )}
                                    </Grid>

                                    {/* Phone */}
                                    <Grid item xs={12}>
                                        {editing ? (
                                            <TextField
                                                fullWidth
                                                label="Phone"
                                                name="phone"
                                                value={updatedProfile.phone || ""}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            <Typography><b>Phone:</b> {updatedProfile.phone}</Typography>
                                        )}
                                    </Grid>

                                    {/* Gender Dropdown */}
                                    <Grid item xs={12}>
                                        {editing ? (
                                            <FormControl fullWidth>
                                                <InputLabel>Gender</InputLabel>
                                                <Select
                                                    name="gender"
                                                    value={updatedProfile.gender || ""}
                                                    label="Gender"
                                                    onChange={handleChange}
                                                >
                                                    {genderOptions.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        ) : (
                                            <Typography>
                                                <b>Gender:</b>{" "}
                                                {genderOptions.find(g => g.value === updatedProfile.gender)?.label || updatedProfile.gender}
                                            </Typography>
                                        )}
                                    </Grid>

                                    {/* Zodiac Dropdown */}
                                    <Grid item xs={12}>
                                        {editing ? (
                                            <FormControl fullWidth>
                                                <InputLabel>Zodiac Sign</InputLabel>
                                                <Select
                                                    name="zodiac"
                                                    value={updatedProfile.zodiac || ""}
                                                    label="Zodiac Sign"
                                                    onChange={handleChange}
                                                >
                                                    {zodiacSigns.map((sign) => (
                                                        <MenuItem key={sign.value} value={sign.value}>
                                                            {sign.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        ) : (
                                            <Typography>
                                                <b>Zodiac Sign:</b>{" "}
                                                {zodiacSigns.find(z => z.value === updatedProfile.zodiac)?.label || updatedProfile.zodiac}
                                            </Typography>
                                        )}
                                    </Grid>

                                    {/* Birth Date */}
                                    <Grid item xs={12}>
                                        {editing ? (
                                            <DatePicker
                                                label="Birth Date"
                                                value={dayjs(updatedProfile.birthDate)}
                                                onChange={(newDate) =>
                                                    setUpdatedProfile({
                                                        ...updatedProfile,
                                                        birthDate: newDate.toISOString(),
                                                    })
                                                }
                                                format="DD MMM YYYY"
                                                sx={{ width: "100%" }}
                                            />
                                        ) : (
                                            <Typography>
                                                <b>Birth Date:</b>{" "}
                                                {dayjs(updatedProfile.birthDate).format("DD MMM YYYY")}
                                            </Typography>
                                        )}
                                    </Grid>
                                </Grid>

                                {/* Action Buttons */}
                                <Box sx={{ mt: 3 }}>
                                    {editing ? (
                                        <>
                                            <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={handleSave}>
                                                Save
                                            </Button>
                                            <Button variant="outlined" color="error" onClick={() => setEditing(false)}>
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <Button variant="contained" color="secondary" onClick={() => setEditing(true)}>
                                            Edit Profile
                                        </Button>
                                    )}
                                </Box>
                            </>
                        )}
                    </Paper>
                </Container>
            </Box>
        </LocalizationProvider>
    );
};

export default ProfilePage;
