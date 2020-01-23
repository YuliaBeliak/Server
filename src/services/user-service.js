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

    const access = await generateAccessToken(user._id);
    const refresh = await user.generateRefreshToken();

    return {
        user: await get(user._id),
        tokens: {
            access,
            refresh
        }
    };
};

const generateAccessToken = async id => {
    try {
        const token = await jwt.sign({_id: id}, access.key, {expiresIn: access.expiresIn});
        return {
            token,
            expiryDate: jwt.decode(token).exp
        }
    } catch (e) {
        throw new Error({error: e.message});
    }
};

const getToken = async body => {
    const refreshToken = body.token;
    const payload = await jwt.verify(refreshToken, refresh.key);
    const {_id} = payload;
    return  await generateAccessToken(_id);
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
    const result = await User.aggregate([
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

    result[0].city = result[0].city.toString();

    return result[0];
};

const addAndLogin = async body => {
    const password = body.password;
    body.password = bCrypt.hashSync(body.password, 10);
    const user = new User(body);
    await user.save();
    return await login({login: body.login, password})
};

const update = async (id, body) => {
    if (body.password) {
        body.password = bCrypt.hashSync(body.password, 10);
    }
    const result = await User.findByIdAndUpdate(id, body, {new: true, runValidators: true});
    if (result === null) {
        throw new Error('User not found');
    }
    return await get(result._id)
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
    addAndLogin,
    update,
    remove,
    login,
    getToken
};