var express = require('express');
var router = express.Router();
var staticModels = require('../staticModels/planets');
var starTrekModels = require('../staticModels/starTrekPlanets');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/staticPlanets', function (req, res, next) {
  res.send(JSON.stringify( staticModels.planet ));
});

router.get('/starTrekPlanets', function (req, res, next) {
  res.send(JSON.stringify( starTrekModels.starTrekPlanets ));
})

module.exports = router;
