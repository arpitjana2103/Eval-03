const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');

const {apiRouter} = require('./routes/apiRoute');

dotenv.config({
    path: './config.env',
});

const app = express();

app.use(express.json());

app.get('/', function (req, res) {
    res.status(200).json({
        status: 'success',
        message: 'Wellcome',
    });
});

app.use('/api/', apiRouter);

const PORT = process.env.PORT;

app.listen(PORT, function () {
    console.log('Connecting with DB..');
});

// DB Connection
const DB = process.env.DB;
// const DB = process.env.DB_LOCAL;

mongoose
    .connect(DB)
    .then(function () {
        console.log('Connected with DB');
        console.log(`Server is Running: http://127.0.0.1:${PORT}`);
    })
    .catch(function (err) {
        console.log('DB Connection ERROR');
    });
