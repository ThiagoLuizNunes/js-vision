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

  await faceImages.forEach((img, i) => fr.saveImage(`./uploads/faces/face_${userName}${i}.jpg`, img));
  await recognizer.addFaces(faceImages, `${userName}`);

  const modelState = recognizer.serialize();
  fs.readFile(`./models/neural-net.model.json`, 'UTF-8', (err, data) => {  
    if (err) {
      fs.writeFileSync(`./models/neural-net.model.json`, JSON.stringify(modelState,  null, 2));
    } else {
      let readedData = JSON.parse(data);
      let index = null;
      // Find className index in neural net
      readedData.forEach((data, i) => {
        if (data.className === `${userName}`) {
          index = i;
        }
      });
      // Add new face in array of face descriptions that className
      if (index) {
        modelState[0].faceDescriptors.forEach((data, i ) => {
          readedData[index].faceDescriptors.push(modelState[0].faceDescriptors[i]);
        });
      } else {
        readedData.push(modelState[0]);
      }
      fs.writeFileSync(`./models/neural-net.model.json`, JSON.stringify(readedData, null, 2));
    }
  });
  res.json('Image uploaded with success!');
});

module.exports = router;
