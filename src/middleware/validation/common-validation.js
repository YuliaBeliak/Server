const validate = scheme => async (req, res, next) => {
    try {
        await scheme.validateAsync(req.body);
        next()
    }
    catch (err) {
        res.status(400).send({error: err.message})
    }
};

module.exports = validate;
