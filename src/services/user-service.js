const {User, validationScheme} = require('../models/user-model');
const ObjectId = require('mongodb').ObjectID;

const getAll = async () => {
    const result = await User.aggregate([
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
                city: '$city.title'
            }
        }
    ]);
    return result
};

const get = async id => {
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
                city: '$city.title'
            }
        }
    ]);
    return result
};

const add = async body => {
    try {
        await validationScheme.validateAsync(body);
        const user = new User(body);
        return await user.save();
    }
    catch (err) {
        return err;
    }
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
    remove
};