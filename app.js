const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const env = require('./.env');

const indexRoute = require('./routes/index');
const faceRecRoute = require('./routes/face-recognition');
const faceUploaderRoute = require('./routes/face-uploader');

const app = express();

// process.env.CLOUD_NAME = env.cloud_name;
// process.env.API_KEY = env.api_key;
// process.env.API_SECRET = env.api_secret;

app.use(logger('dev'));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute);
app.use('/auth', faceRecRoute);
app.use('/face-uploader', faceUploaderRoute);

module.exports = app;
