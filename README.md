# Weather Monitoring System

## Overview
This project is a real-time weather monitoring system that fetches weather data from the OpenWeatherMap API for various cities in India. It displays the data through a web application built with React.js, while the back-end is built using Node.js and MongoDB for data storage.

### Features:
- Fetches real-time weather data (temperature, weather conditions, etc.) from the OpenWeatherMap API.
- Supports configurable intervals to retrieve weather updates.
- Displays weather summaries (temperature, weather conditions) for six major cities in India.
- Stores weather data in MongoDB for future analysis and historical tracking.

## Project Structure
```plaintext
weather-monitoring-system/
├── backend/
│   ├── models/
│   │   └── Weather.js
│   ├── routes/
│   │   └── weather.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── WeatherTable.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles.css
│   ├── .env (optional)
│   └── package.json
│
├── .gitignore
└── README.md
"# weather_monitoring_application" 
