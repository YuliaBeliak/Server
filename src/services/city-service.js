const City = require('../models/city-model');
const ObjectId = require('mongodb').ObjectID;

const getAll = async () => {
    return await City.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: 'city',
                as: 'users'
            }
        }
    ]);
};

const get = async id => {
    const city = await City.findById(id);
    if (city === null) {
        throw new Error('City not found');
    }
    const result = await City.aggregate([
        {
            $match: {_id: ObjectId(id)}
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: 'city',
                as: 'users'
            }
        }
    ]);

    return result[0];
};

const add = async body => {
    const city = new City(body);
    return await city.save();
};

const update = async (id, body) => {
    const result = await City.findByIdAndUpdate(id, body, {new: true, runValidators: true});
    if (result === null) {
        throw new Error('City not found');
    }

    return result;
};

const remove = async id => {
    let result = await City.findByIdAndDelete(id);
    if (result === null) {
        throw new Error('City not found');
    }

    return result;
};

module.exports = {
    getAll,
    get,
    add,
    update,
    remove
};