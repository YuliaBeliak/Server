const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routers/user');
const cityRouter = require('./routers/city');
const mongoose = require('mongoose');
const {PORT, mongoUri} = require('../config/app');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../api/swagger/swagger');

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/users', userRouter);
app.use('/cities', cityRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => console.log('Server is running on port 3000'));