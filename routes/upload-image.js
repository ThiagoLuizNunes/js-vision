const fs = require('fs');
const fr = require('face-recognition');
const express = require('express');
const router = express.Router();

const detector = fr.FaceDetector();
const recognizer = fr.FaceRecognizer();
// const detector = fr.AsyncFaceDetector()
// const recognizer = fr.AsyncFaceRecognizer()

router.post('/', async (req, res) => {
  const id = req.body.id;
  const userName = req.body.name;
  const base64 = req.body.data.replace(/^data:image\/png;base64,/, "");
  fs.writeFileSync(`uploads/images/${userName}${id}.jpg`, base64, {encoding: 'base64'});
  
  const targetSize = 150;
  const image = await fr.loadImage(`./uploads/images/${userName}${id}.jpg`);
  const faceImages = await detector.detectFaces(image, targetSize);

  await faceImages.forEach((img, i) => fr.saveImage(`./uploads/faces/face_${userName}${id}.jpg`, img));
  await recognizer.addFaces(faceImages, `${userName}`);

  const modelState = recognizer.serialize();
  fs.readFile(`./models/${userName}.model.json`, 'UTF-8', (err, data) => {  
    if (err) {
      fs.writeFileSync(`./models/${userName}.model.json`, JSON.stringify(modelState,  null, 2));
    } else {
      data = JSON.parse(data);
      data[0].faceDescriptors.push(modelState[0].faceDescriptors[0]);
      fs.writeFileSync(`./models/${userName}.model.json`, JSON.stringify(data, null, 2));
    }
  });
  res.json('Image uploaded with success!');
});

module.exports = router;
