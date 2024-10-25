const express = require('express');
const Weather = require('../models/Weather');
const Alert = require('../models/Alert');
const router = express.Router();

// Get current weather
router.get('/current/:city', async (req, res) => {
    try {
        const data = await Weather.findOne({ city: req.params.city })
            .sort({ date: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get daily summary
router.get('/summary/:city/:date', async (req, res) => {
    try {
        const summary = await Weather.getDailySummary(
            req.params.city,
            new Date(req.params.date)
        );
        res.json(summary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get alerts
router.get('/alerts/:city', async (req, res) => {
    try {
        const alerts = await Alert.find({
            city: req.params.city,
            triggered: true
        }).sort({ date: -1 });
        res.json(alerts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;