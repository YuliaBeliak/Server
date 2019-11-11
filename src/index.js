const express = require('express');
const fs = require('fs');
const path = require('path');
const stream = require('stream');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const pathToStorage = path.join(__dirname, './storage/user.json');

let storage;

fs.readFile(pathToStorage, 'utf8', (err, data) => {
    if (err) {
        console.log('Cannot read storage file', err);
        return;
    }
    storage = JSON.parse(data);
});

app.route('/')
    .get((req, res) => {
        res.send(storage);
    });

app.route('/users')
    .get((req, res) => {
        const { id } = req.body;
        const idx = storage.findIndex(el => el.id === id);
        res.send(storage[idx]);
    })
    .post((req, res) => {
        const newUser = req.body;
        const generateId = () => `f${(~~(Math.random()*1e8)).toString(16)}`;
        newUser.id = generateId();
        storage.push(newUser);
        fs.writeFile(pathToStorage, JSON.stringify(storage), (err) => {
            if (err) return;
        });
        res.send('done');
    })
    .put((req, res) => {
        const user = req.body;
        const { id } = user;
        const idx = storage.findIndex(el => el.id === id);
        storage[idx] = user;
        fs.writeFile(pathToStorage, JSON.stringify(storage), (err) => {
            if (err) return;
        });
        res.send('done');
    })
    .delete((req, res) => {
        const { id } = req.body;
        const idx = storage.findIndex(el => el.id === id);
        storage.splice(idx, 1);
        fs.writeFile(pathToStorage, JSON.stringify(storage), (err) => {
            if (err) return;
        });
        res.send('done');
    });

app.listen('3000', () => console.log('Server is running on port 3000'));