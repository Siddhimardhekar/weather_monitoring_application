require('dotenv').config();
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const Weather = require('./models/Weather');
const Alert = require('./models/Alert');
const weatherRoutes = require('./routes/weather');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/weather', weatherRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function checkAlerts(city, temperature) {
    const recentReadings = await Weather.find({ city })
        .sort({ date: -1 })
        .limit(2); // Check last two readings

    if (recentReadings.length === 2 && recentReadings.every(r => r.temperature > 35)) { // Example threshold
        await Alert.create({
            city,
            condition: 'High Temperature',
            threshold: 35,
            triggered: true
        });
    }
}

async function fetchWeather(city) {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        );

        const weatherData = new Weather({
            city,
            temperature: response.data.main.temp,
            feels_like: response.data.main.feels_like,
            main: response.data.weather[0].main,
            description: response.data.weather[0].description
        });

        await weatherData.save();
        await checkAlerts(city, response.data.main.temp);
    } catch (err) {
        console.error(`Error fetching weather data for ${city}:`, err);
    }
}

// Fetch weather for multiple cities every 5 minutes
async function fetchWeatherForCities() {
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    await Promise.all(cities.map(city => fetchWeather(city)));
}

// Schedule data fetch every 5 minutes
setInterval(fetchWeatherForCities, 300000); // 5 minutes

// Initial fetch
fetchWeatherForCities();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));