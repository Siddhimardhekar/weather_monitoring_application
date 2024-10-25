import React, { useState, useEffect } from 'react';
import WeatherTable from './WeatherTable';
import DailySummary from './DailySummary';
import AlertsList from './AlertsList';
import axios from 'axios';

const WeatherDashboard = () => {
    const [currentWeather, setCurrentWeather] = useState([]);
    const [dailySummary, setDailySummary] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

                // Fetch current weather
                const weatherPromises = cities.map(city =>
                    axios.get(`/api/weather/current/${city}`)
                );
                const weatherResponses = await Promise.all(weatherPromises);
                setCurrentWeather(weatherResponses.map(r => r.data));

                // Fetch daily summaries
                const today = new Date().toISOString().split('T')[0];
                const summaryPromises = cities.map(city =>
                    axios.get(`/api/weather/summary/${city}/${today}`)
                );
                const summaryResponses = await Promise.all(summaryPromises);
                setDailySummary(summaryResponses.map(r => r.data));

                // Fetch alerts
                const alertsPromises = cities.map(city =>
                    axios.get(`/api/weather/alerts/${city}`)
                );
                const alertsResponses = await Promise.all(alertsPromises);
                setAlerts(alertsResponses.map(r => r.data).flat());
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 300000); // Update every 5 minutes

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dashboard">
            <WeatherTable weatherData={currentWeather} />
            <DailySummary summaryData={dailySummary} />
            <AlertsList alerts={alerts} />
        </div>
    );
};

export default WeatherDashboard;