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
    const newUser = req.body;
    newUser.id = generateId();
    storage.push(newUser);
    updateStorage();
    return newUser;
};

const get = req => {
    const {id} = req.body;
    const idx = storage.findIndex(el => el.id === id);
    if (idx > 0) {
        return storage[idx];
    } else {
        throw new Error('User not found');
    }
};

const update = req => {
    const user = req.body;
    const {id} = user;
    const idx = storage.findIndex(el => el.id === id);
    if (idx > 0) {
        storage[idx] = user;
        updateStorage();
        return ('User data has been updated')
    } else {
        throw new Error('User not found');
    }
};

const remove = req => {
    const {id} = req.body;
    const idx = storage.findIndex(el => el.id === id);
    if (idx > 0) {
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
    remove
};