const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

const PORT = 3000;

app.get("/weather", async (req, res) => {
     console.log("WEATHER REQUEST:", req.query.city);

    
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({
            error: "City is required"
        });
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${encodeURIComponent(city)}&appid=${process.env.OPENWEATHER_API_KEY}`
        );

        const data = await response.json();

        console.log("OpenWeather status:", response.status);
        console.log("OpenWeather response:", data);

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.json(data);

    } catch (error) {
        console.error("Weather error:", error);

        res.status(500).json({
            error: "Failed to fetch weather data"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});