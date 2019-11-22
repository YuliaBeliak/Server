const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../../config/app');

const authorize = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            throw new Error('Token is not provided');
        }
        const token = authHeader.replace('Bearer', '').trim();
        jwt.verify(token, jwtSecret);
        next();

    } catch (e) {
        res.status(401).send({error: e.message})
    }
};

module.exports = authorize;