const express = require('express');
const path = require('path');
const fs = require('fs');
const fr = require('face-recognition');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  const dataPath = path.join(__dirname, '../uploads/faces');
  const classNames = ['thiago'];

  const allFiles = fs.readdirSync(dataPath);
  const imagesByClass = classNames.map(c =>
    allFiles
      .filter(f => f.includes(c))
      .map(f => path.join(dataPath, f))
      .map(fp => fr.loadImage(fp))
  );
  console.log(imagesByClass)
  const numTrainingFaces = 10;
  const trainDataByClass = imagesByClass.map(imgs => imgs.slice(0, numTrainingFaces));
  const testDataByClass = imagesByClass.map(imgs => imgs.slice(numTrainingFaces));
  
  res.send(imagesByClass);
});

module.exports = router;


