'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const pg = require('pg');

const environment = process.env.NODE_ENV;
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config);
const multer  = require('multer');
const upload = multer({dest: './uploads'});

const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');


// { fieldname: 'image',
//   originalname: 'coffee.JPG',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   buffer: <Buffer ff d8 ff e1 2f fe 45 78 69 66 00 00 4d 4d 00 2a 00 00 00 08 00 0b 01 0f 00 02 00 00 00 06 00 00 00 92 01 10 00 02 00 00 00 0a 00 00 00 98 01 12 00 03 ... >,
//   size: 2045316 }

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('form');
});

app.post('/photo', upload.single('image'), function (req, res) {
  console.log(req.file);
  console.log(req.file.path);
  fs.readFile(req.file.path, function (err, data) {
    console.log(data);
    knex('images').insert({image: data}).then(function () {
      res.redirect('back');
    });
  });
});

app.listen(PORT, function () {
  console.log('Lisening!');
});

module.exports = app;
