const fs = require('fs');
const fr = require('face-recognition');
const path = require('path');
const express = require('express');
const router = express.Router();
const detector = fr.AsyncFaceDetector()
const recognizer = fr.AsyncFaceRecognizer()

router.post('/', (req, res) => {
  const id = req.body.id;
  const userName = req.body.name;
  const base64 = req.body.data.replace(/^data:image\/png;base64,/, "");
  fs.writeFileSync(`uploads/images/${userName}${id}.jpg`, base64, {encoding: 'base64'});
  
  const targetSize = 150;
  const image = fr.loadImage(`./uploads/images/${userName}${id}.jpg`);
  let faceImage;
  detector.detectFaces(image, targetSize)
    .then((response) => {
      faceImage = response[0];
      fr.saveImage(`./uploads/faces/face_${userName}${id}.jpg`, response[0]);
    })
    .catch((error) => {
    });

  // Promise.all([
  //   recognizer.addFaces(faceImage, `${userName}`)
  // ])
  //   .then(() => {
  //     const modelState = recognizer.serialize();
  //     // const userdb = JSON.parse(fs.readFileSync(`./models/${userName}.model.json`, 'UTF-8'));
  //     // if (!userdb) {
  //       fs.writeFileSync(`./models/${userName}.model.json`, JSON.stringify(modelState));
  //     // } else {
  //     //   userdb.concat(modelState);
  //     // }
  //   })
  //   .catch((error) => {
      
  //   })
  res.json('Image uploaded with success!');
});

module.exports = router;
