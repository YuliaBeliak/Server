const mongoose = require('mongoose');

const cityScheme = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    country: {
        type: String,
        trim: true,
        required: true
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
    }
});

const City = mongoose.model('City', cityScheme);

module.exports = City;
