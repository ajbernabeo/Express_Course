var express = require('express');
var router = express.Router();
var storyLine = require('../models/storyLine');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "A Fox's Journey" })
});

router.get('/beginning', function(req, res, next) {
  let read = storyLine.line.find( peep => {
    return peep.storyPart === "beginning";
  });
  res.render('beginning', { read });
});

router.get('/middle', function(req, res, next) {
  let read = storyLine.line.find( peep => {
    return peep.storyPart === "middle";
  });
  res.render('middle', { read });
});

router.get('/end', function(req, res, next) {
  let read = storyLine.line.find( peep => {
    return peep.storyPart === "end";
  });
  res.render('end', { read });
});

module.exports = router;
