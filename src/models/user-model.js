const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        match: /^[a-z]+$/i,
        minlength: 2,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        match: /^[a-z]+$/i,
        minlength: 2,
        required: true
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const User = mongoose.model('User', userScheme);

module.exports = User;