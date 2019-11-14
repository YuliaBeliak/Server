const User = require('../models/user-model');

const show = async () => {
    return await User.find({});
};

const add = async body => {
    const user = new User(body);
    await user.save();
    return `New ${user} has been added`;
};

const get = async id => {
    return await User.findById(id);
};

const update = async (id, body) => {
    await User.findByIdAndUpdate(id, body);
    return 'User has been updated';
};

const remove = async id => {
    await User.findByIdAndDelete(id);
    return 'User has been removed';
};

module.exports = {
    add,
    get,
    update,
    remove,
    show
};