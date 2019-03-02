const path = require('path');
const fr = require('face-recognition');
const detector = fr.FaceDetector();
const targetSize = 150;

const image = fr.loadImage(path.join(__dirname, '../uploads/images/default.jpg'));
const faceImages = detector.detectFaces(image, targetSize);
for(let i = 0; i < faceImages.length; i ++) {
  fr.saveImage(`./uploads/faces/face_${i}.jpg`, faceImages[i]);
}
