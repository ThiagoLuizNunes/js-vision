const express = require('express');
const path = require('path');
// const cloudinary = require('../config/cloudinary');
const cloudinary = require("cloudinary");
const router = express.Router();

cloudinary.config(
  {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  }
);

/* GET users listing. */
router.post('/', (req, res) => {
  const pathImage = path.join(__dirname, 'public/images/perfil.jpg');
  console.log(pathImage);
  let result;

  cloudinary.uploader.upload(pathImage, function(err,image){
    console.log("** Eager Transformations");
    if (err){ console.warn(err);}
    waitForAllUploads("lake",err,image);
  });

  res.send('result');
});

module.exports = router;
