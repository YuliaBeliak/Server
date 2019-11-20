const City = require('../models/city-model');
const ObjectId = require('mongodb').ObjectID;

const getAll = async () => {
    return await City.find({});
};

const get = async id => {
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

    return result
};

const add = async body => {
    const city = new City(body);
    return await city.save();
};

const update = async (id, body) => {
    return await City.findByIdAndUpdate(id, body, {runValidators: true});
};

const remove = async id => {
    return await City.findByIdAndDelete(id);
};

module.exports = {
    getAll,
    get,
    add,
    update,
    remove
};