const User = require('../models/user-model');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;
const {access, refresh} = require('../../config/app').jwt;

const login = async body => {
    const user = await User.findOne({login: body.login});
    if (!user) {
        throw new Error('User not found')
    }
    const isValid = await bCrypt.compare(body.password, user.password);

    if (!isValid) {
        throw new Error('Wrong password')
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await user.generateRefreshToken();

    return {
        accessToken,
        refreshToken
    };
};

const generateAccessToken = async id => {
    try {
        return await jwt.sign({_id: id}, access.key, {expiresIn: access.expiresIn});
    } catch (e) {
        throw new Error({error: e.message});
    }
};

const getToken = async body => {
    const refreshToken = body.token;
    const payload = await jwt.verify(refreshToken, refresh.key);
    const {_id} = payload;
    const accessToken = await generateAccessToken(_id);
    return {accessToken};
};

const getAll = async () => {
    return await User.aggregate([
        {
            $lookup: {
                from: 'cities',
                localField: 'city',
                foreignField: '_id',
                as: 'city'
            }
        },
        {
            $project: {
                firstName: '$firstName',
                lastName: '$lastName',
                login: '$login',
                password: '$password',
                city: '$city.title'
            }
        }
    ]);
};

const get = async id => {
    const user  = await User.findById(id);
    if (user === null) {
        throw new Error('User not found');
    }
    return await User.aggregate([
        {
            $match: {_id: ObjectId(id)}
        },
        {
            $lookup: {
                from: 'cities',
                localField: 'city',
                foreignField: '_id',
                as: 'city'
            }
        },
        {
            $project: {
                firstName: '$firstName',
                lastName: '$lastName',
                login: '$login',
                password: '$password',
                city: '$city.title'
            }
        }
    ]);
};

const add = async body => {
    body.password = bCrypt.hashSync(body.password, 10);
    const user = new User(body);
    return await user.save();
};

const update = async (id, body) => {
    if (body.password) {
        body.password = bCrypt.hashSync(body.password, 10);
    }
    const result = await User.findByIdAndUpdate(id, body, {new: true, runValidators: true});
    if (result === null) {
        throw new Error('User not found');
    }
    return result;
};

const remove = async id => {
    let result = await User.findByIdAndDelete(id);
    if (result === null) {
        throw new Error('User not found');
    }
    return result;
};

module.exports = {
    getAll,
    get,
    add,
    update,
    remove,
    login,
    getToken
};