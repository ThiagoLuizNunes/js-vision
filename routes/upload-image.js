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
  detector.detectFaces(image, targetSize)
    .then((response) => {
      fr.saveImage(`./uploads/faces/face_${userName}${id}.jpg`, response[0]);
      Promise.all([
        recognizer.addFaces(response, `${userName}`)
      ])
        .then(() => {
          const modelState = recognizer.serialize();
          fs.readFile(`./models/${userName}.model.json`, 'UTF-8', (err, data) => {  
            if (err) {
              fs.writeFileSync(`./models/${userName}.model.json`, JSON.stringify(modelState,  null, 2));
            } else {
              console.log(data.length);
              // data.faceDescriptors.push(modelState.faceDescriptors[0]);
              // fs.writeFileSync(`./models/${userName}.model.json`, JSON.stringify(data, null, 2));
            }
          });
        })
        .catch((error) => {
          
        })
    })
    .catch((error) => {
    });

  res.json('Image uploaded with success!');
});

module.exports = router;
