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

const add = req => {
    if (!req.body.firstName || !req.body.lastName) {
        throw new Error('Incorrect data, json should contain "firstName" and "lastName" fields');
    } else {
        const newUser = req.body;
        newUser.id = generateId();
        storage.push(newUser);
        updateStorage();
        return `New user ${newUser.firstName} ${newUser.lastName} has been added`;
    }
};

const get = req => {
    if (!req.body.id) {
        throw new Error('Incorrect data, json should contain "id" field');
    } else {
        const {id} = req.body;
        const idx = storage.findIndex(el => el.id === id);
        if (idx >= 0) {
            return storage[idx];
        } else {
            throw new Error('User not found');
        }
    }
};

const update = req => {
    if (!req.body.id || !req.body.firstName || !req.body.lastName) {
        throw new Error('Incorrect data, json should contain "id", "firstName", "lastName" fields');
    } else {
        const user = req.body;
        const {id} = user;
        const idx = storage.findIndex(el => el.id === id);
        if (idx >= 0) {
            storage[idx] = user;
            updateStorage();
            return 'User data has been updated';
        } else {
            throw new Error('User not found');
        }
    }
};

const remove = req => {
    if (!req.body.id) {
        throw new Error('Incorrect data, json should contain "id" field');
    } else {
        const {id} = req.body;
        const idx = storage.findIndex(el => el.id === id);
        if (idx >= 0) {
            storage.splice(idx, 1);
            updateStorage();
            return ('User has been removed');
        } else {
            throw new Error('User not found');
        }
    }
};

module.exports = {
    add,
    get,
    update,
    remove
};