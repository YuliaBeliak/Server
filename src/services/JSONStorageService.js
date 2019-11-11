const fs = require('fs');
const path = require('path');

const pathToStorage = path.join(__dirname, '../storage/user.json');
const storage = JSON.parse(fs.readFileSync(pathToStorage));

const updateStorage = () => {
    fs.writeFile(pathToStorage, JSON.stringify(storage), (err) => {
        if (err) return;
    });
};

const showAllUsers = (req, res) => {
    res.send(storage);
};

const showUser = (req, res) => {
    const {id} = req.body;
    const idx = storage.findIndex(el => el.id === id);
    if (idx > 0) {
        res.send(storage[idx]);
    } else {
        res.send('User not found');
    }
};

const addUser = (req, res) => {
    const newUser = req.body;
    newUser.id = generateId();
    storage.push(newUser);
    updateStorage();
    res.send('done');
};

const updateUser = (req, res) => {
    const user = req.body;
    const {id} = user;
    const idx = storage.findIndex(el => el.id === id);
    if (idx > 0) {
        storage[idx] = user;
        updateStorage();
        res.send('done');
    } else {
        res.send('User not found');
    }
};

const deleteUser = (req, res) => {
    const {id} = req.body;
    const idx = storage.findIndex(el => el.id === id);
    if (idx > 0) {
        storage.splice(idx, 1);
        updateStorage();
        res.send('done');
    } else {
        res.send('User not found');
    }
};

const generateId = () => `f${(~~(Math.random() * 1e8)).toString(16)}`;


const checkUserId = (id) => {
    return storage.findIndex(el => el.id === id);
};

module.exports = {
    showAllUsers,
    showUser,
    addUser,
    updateUser,
    deleteUser
};