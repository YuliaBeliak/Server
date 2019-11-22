const Joi = require('@hapi/joi');

const createScheme = Joi.object({
    firstName: Joi.string().pattern(/^[a-z]+$/i).min(2).max(30).trim().required(),
    lastName: Joi.string().pattern(/^[a-z]+$/i).min(2).max(30).trim().required(),
    login: Joi.string().min(8).max(30).required(),
    password: Joi.string().pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-z, 0-9-_!/?&*#]+$/).min(8).max(30).required(),
    city: Joi.string().trim().required()
});

const updateScheme = Joi.object({
    firstName: Joi.string().pattern(/^[a-z]+$/i).min(2).max(30).trim(),
    lastName: Joi.string().pattern(/^[a-z]+$/i).min(2).max(30).trim(),
    login: Joi.string().min(8).max(30),
    password: Joi.string().pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-z, 0-9-_!/?&*#]+$/).min(8).max(30),
    city: Joi.string().trim()
});

module.exports = {
    createScheme,
    updateScheme
};