const fs = require('fs');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const id = req.body.id;
  const base64 = req.body.data.replace(/^data:image\/png;base64,/, "");
  fs.writeFile(`uploads/images/thiago${id}.jpg`, base64, {encoding: 'base64'}, (err)  => {
    console.log('Error', err);
  });
  res.json('Image uploaded with success!');
});

module.exports = router;
