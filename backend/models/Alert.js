const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    city: String,
    condition: String,
    threshold: Number,
    triggered: Boolean,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', alertSchema);