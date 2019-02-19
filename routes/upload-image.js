const fs = require('fs');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  let base64 = req.body.data.replace(/^data:image\/png;base64,/, "");
  fs.writeFile('uploads/test.png', base64, {encoding: 'base64'}, (err)  => {
    console.log('Error', err);
  });
  res.json('Image uploaded with success!');
});

module.exports = router;
