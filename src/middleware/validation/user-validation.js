const Joi = require('@hapi/joi');

const createScheme = Joi.object({
    firstName: Joi.string().pattern(/^[a-z]+$/i).min(2).max(30).trim().required(),
    lastName: Joi.string().pattern(/^[a-z]+$/i).min(2).max(30).trim().required(),
    city: Joi.string().trim().required()
});

const updateScheme = Joi.object({
    firstName: Joi.string().pattern(/^[a-z]+$/i).min(2).max(30).trim(),
    lastName: Joi.string().pattern(/^[a-z]+$/i).min(2).max(30).trim(),
    city: Joi.string().trim()
});

module.exports = {
    createScheme,
    updateScheme
};