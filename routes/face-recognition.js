const express = require('express');
const fr = require('face-recognition');
const router = express.Router();
const recognizer = fr.FaceRecognizer();
const neuralModelState = require('../models/neural.model.json');

/* GET users listing. */
router.get('/auth', (req, res) => {
  res.send('res');
});

module.exports = router;


