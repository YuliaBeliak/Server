const Joi = require('@hapi/joi');

const createScheme = Joi.object({
    title: Joi.string().pattern(/^[a-z,-, ]+$/i).min(2).max(30).trim().required(),
    country: Joi.string().pattern(/^[a-z,-, ]+$/i).min(2).max(30).trim().required()
});

const updateScheme = Joi.object({
    title: Joi.string().pattern(/^[a-z,-, ]+$/i).min(2).max(30).trim(),
    country: Joi.string().pattern(/^[a-z,-, ]+$/i).min(2).max(30).trim()
});

module.exports = {
    createScheme,
    updateScheme
};