const jwt = require('jsonwebtoken');
const {key} = require('../../config/app').jwt.access;

const authorize = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            throw new Error('Token is not provided');
        }
        const token = authHeader.replace('Bearer', '').trim();
        await jwt.verify(token, key);
        next();

    } catch (e) {
        res.status(401).send({error: e.message})
    }
};

module.exports = authorize;