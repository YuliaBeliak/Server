const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

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

const validationScheme = Joi.object({
    firstName: Joi.string().pattern(/^[a-z]+$/i).min(2).max(30).trim().required(),
    lastName: Joi.string().pattern(/^[a-z]+$/i).min(2).max(30).trim().required(),
    city: Joi.string().trim().required()
});

const User = mongoose.model('User', userScheme);

module.exports = {
    User,
    validationScheme
};