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
}, {
    versionKey: false
});

const User = mongoose.model('User', userScheme);

module.exports = User;