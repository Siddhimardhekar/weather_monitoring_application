import React from 'react';
import { FaSun, FaCloud, FaSnowflake, FaCloudRain, FaSmog } from 'react-icons/fa';

const getWeatherIcon = (weather) => {
    switch (weather) {
        case 'Clear': return <FaSun />;
        case 'Clouds': return <FaCloud />;
        case 'Rain':
        case 'Drizzle': return <FaCloudRain />;
        case 'Snow': return <FaSnowflake />;
        default: return <FaSmog />;
    }
};

const WeatherTable = ({ weatherData }) => (
    <table>
        <thead>
            <tr>
                <th>City</th>
                <th>Temperature (°C)</th>
                <th>Weather</th>
            </tr>
        </thead>
        <tbody>
            {weatherData.length === 0 ? (
                <tr>
                    <td colSpan="3">No weather data available.</td>
                </tr>
            ) : (
                weatherData.map((weather, index) => (
                    <tr key={index}>
                        <td>{weather.city}</td>
                        <td>{weather.temperature.toFixed(1)}</td>
                        <td>{getWeatherIcon(weather.main)} {weather.main}</td>
                    </tr>
                ))
            )}
        </tbody>
    </table>
);

export default WeatherTable;