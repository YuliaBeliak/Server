const express = require('express');
const bodyParser = require('body-parser');
const storageService = require('./services/JSONStorageService');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', storageService.showAllUsers);

app.route('/users')
    .get(storageService.showUser)
    .post(storageService.addUser)
    .put(storageService.updateUser)
    .delete(storageService.deleteUser);

app.listen('3000', () => console.log('Server is running on port 3000'));