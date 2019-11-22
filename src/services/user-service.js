const User = require('../models/user-model');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;
const {jwtSecret} =require('../../config/app');

const login = async body => {
    const user = await User.findOne({login: body.login});
    if (!user) {
        throw new Error('User not found')
    }
    const isValid = await bCrypt.compare(body.password, user.password);

    if (!isValid) {
        throw new Error('Wrong password')
    }
    const token = jwt.sign(user._id.toString(), jwtSecret);
    return {token};
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
    return await User.findByIdAndUpdate(id, body, {runValidators: true});
};

const remove = async id => {
    return await User.findByIdAndDelete(id);
};

module.exports = {
    getAll,
    get,
    add,
    update,
    remove,
    login
};