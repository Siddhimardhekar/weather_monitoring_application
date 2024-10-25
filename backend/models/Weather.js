const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    city: String,
    temperature: Number,
    feels_like: Number,
    main: String, // Main weather condition
    description: String,
    date: { type: Date, default: Date.now }
});

// Add methods for daily aggregates
weatherSchema.statics.getDailySummary = async function (city, date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.aggregate([
        {
            $match: {
                city: city,
                date: { $gte: startOfDay, $lte: endOfDay }
            }
        },
        {
            $group: {
                _id: "$city",
                avgTemp: { $avg: "$temperature" },
                maxTemp: { $max: "$temperature" },
                minTemp: { $min: "$temperature" },
                conditions: { $push: "$main" }
            }
        }
    ]);
};

module.exports = mongoose.model('Weather', weatherSchema);