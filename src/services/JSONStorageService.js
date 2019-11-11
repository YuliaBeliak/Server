const fs = require('fs');
const path = require('path');

const pathToStorage = path.join(__dirname, '../storage/user.json');
const storage = JSON.parse(fs.readFileSync(pathToStorage));

const showAllUsers = (req, res) => {
    res.send(storage);
};

const showUser = (req, res) => {
    const {id} = req.body;
    const idx = storage.findIndex(el => el.id === id);
    res.send(storage[idx]);
};

const addUser = (req, res) => {
    const newUser = req.body;
    const generateId = () => `f${(~~(Math.random() * 1e8)).toString(16)}`;
    newUser.id = generateId();
    storage.push(newUser);
    fs.writeFile(pathToStorage, JSON.stringify(storage), (err) => {
        if (err) return;
    });
    res.send('done');
};

const updateUser = (req, res) => {
    const user = req.body;
    const {id} = user;
    const idx = storage.findIndex(el => el.id === id);
    storage[idx] = user;
    fs.writeFile(pathToStorage, JSON.stringify(storage), (err) => {
        if (err) return;
    });
    res.send('done');
};

const deleteUser = (req, res) => {
    const {id} = req.body;
    const idx = storage.findIndex(el => el.id === id);
    storage.splice(idx, 1);
    fs.writeFile(pathToStorage, JSON.stringify(storage), (err) => {
        if (err) return;
    });
    res.send('done');
};

module.exports = {
    showAllUsers,
    showUser,
    addUser,
    updateUser,
    deleteUser
};