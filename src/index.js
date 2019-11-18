const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers/user');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/users', router);

app.listen('3000', () => console.log('Server is running on port 3000'));