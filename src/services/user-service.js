const fs = require('fs');
const path = require('path');

const pathToStorage = path.join(__dirname, '../storage/user.json');
const storage = JSON.parse(fs.readFileSync(pathToStorage));

const updateStorage = () => {
    fs.writeFile(pathToStorage, JSON.stringify(storage, null, 2), (err) => {
        if (err) return;
    });
};

const generateId = () => `f${(~~(Math.random() * 1e8)).toString(16)}`;

const show = () => {
    return storage.map(el => `${el.firstName} ${el.lastName}`);
};

const add = body => {
    if (!body.firstName || !body.lastName) {
        throw new Error('Incorrect data, json should contain "firstName" and "lastName" fields');
    } else {
        const newUser = {
            firstName: body.firstName,
            lastName: body.lastName,
            id: generateId()
        };
        storage.push(newUser);
        updateStorage();
        return `New user ${newUser.firstName} ${newUser.lastName} has been added`;
    }
};

const get = id => {
    const user = storage.find(el => el.id === id);
    if (user) {
        return user;
    } else {
        throw new Error('User not found');
    }
};

const update = (id, body) => {
    if (!body.firstName && !body.lastName) {
        throw new Error('Nothing to update');
    }
    const idx = storage.findIndex(el => el.id === id);
    if (idx >= 0) {
        storage[idx] = {...storage[idx], ...body};
        updateStorage();
        return 'User data has been updated';
    } else {
        throw new Error('User not found');
    }
};

const remove = id => {
    const idx = storage.findIndex(el => el.id === id);
    if (idx >= 0) {
        storage.splice(idx, 1);
        updateStorage();
        return ('User has been removed');
    } else {
        throw new Error('User not found');
    }
};

module.exports = {
    add,
    get,
    update,
    remove,
    show
};