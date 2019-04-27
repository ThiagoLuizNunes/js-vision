const express = require('express');
const fs = require('fs');
const fr = require('face-recognition');
const router = express.Router();
const neuralModelState = require('../models/neural.model.json');

/* GET users listing. */
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const base64 = req.body.data.replace(/^data:image\/png;base64,/, "");

  let faceDescriptors = [];
  await neuralModelState.forEach((data, i) => {
    if (username === data.className) {
      faceDescriptors.push(data);
    }
  });

  if (faceDescriptors.length > 0) {
    const detector = fr.FaceDetector();
    const recognizer = fr.FaceRecognizer();
    recognizer.load(faceDescriptors);

    fs.writeFileSync(`uploads/buffer/${username}.jpg`, base64, {encoding: 'base64'});
    const image = await fr.loadImage(`uploads/buffer/${username}.jpg`);
    const face = await detector.detectFaces(image, 150);
    const predictions = recognizer.predict(face[0]);
    fs.unlinkSync(`uploads/buffer/${username}.jpg`)
    res.status(200).json({ accuracy: predictions, message: 'User authorized with success' });
  } else {
    res.status(400).json({ error: 400, message: 'User not found' });
  }
});

module.exports = router;


