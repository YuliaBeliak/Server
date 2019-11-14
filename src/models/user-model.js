const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        match: /[A-z]+/,
        minlength: 2,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        match: /[A-z]+/,
        minlength: 2,
        required: true
    },
});

const User = mongoose.model('User', userScheme);

module.exports = User;