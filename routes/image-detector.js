const path = require('path');
const fs = require('fs');
const fr = require('face-recognition')
const detector = fr.FaceDetector();
const targetSize = 150;

const image = fr.loadImage(path.join(__dirname, '../uploads/images/thiago.jpg'));
const faceImages = detector.detectFaces(image, targetSize);
// faceImages.forEach((img, i) => fr.saveImage(`../uploads/faces/face_${i}.jpeg`, img));
console.log('Image: ', faceImages[0]);
fr.saveImage('./teste.jpg', faceImages[0]);
