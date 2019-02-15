const fs = require('fs');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const base64 = req.body.toString().replace(/^data:image\/png;base64,/, "");
  // const base64String = req.body.toString();
  // let base64Image = base64String.split(';base64,').pop();

  fs.writeFile('uploads/test.png', base64, {encoding: 'base64'}, (err)  => {
    console.log('Error', err);
  });
  res.json('ok');
});

module.exports = router;
