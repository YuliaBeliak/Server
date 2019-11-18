const User = require('../models/user-model');

const getAll = async () => {
    return await User.find({});
};

const get = async id => {
    return await User.findById(id);
};

const add = async body => {
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
    add,
    get,
    update,
    remove
};