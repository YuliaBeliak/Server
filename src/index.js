const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers/user');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/users', router);

app.listen('3000', () => console.log('Server is running on port 3000'));