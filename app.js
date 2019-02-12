const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const env = require('./.env');
// const fr = require('face-recognition');

const indexRouter = require('./routes/index');
const faceRecRouter = require('./routes/face-recognition');

const app = express();

process.env.CLOUD_NAME = env.cloud_name;
process.env.API_KEY = env.api_key;
process.env.API_SECRET = env.api_secret;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/face-recognition', faceRecRouter);

module.exports = app;
