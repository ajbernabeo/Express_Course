var express = require('express');
var router = express.Router();

let flowers = ["Orchid", "Iris", "Hydrangea", "Amaryllis", "Dahlia", "Daffodil", "Bleeding Heart"];

/* GET home page. */
router.get('/', function(req, res, next) {
  let queryFlowers = req.query.flowers;
  if(flowers.includes(queryFlowers)) {
    res.send("Yes, we have " + queryFlowers + " in our garden");
  } else {
    res.send("Nope, we do not have " + queryFlowers + " in our garden, but maybe we should plant it!");
  }
});

router.post('/', function(req, res, next) {
  let bodyFlowers = req.body;
  if(flowers.includes(bodyFlowers.flowers)) {
    res.send("We already have flower, no need to add it")
  } else {
    flowers.push(bodyFlowers.flowers);
    res.send(flowers);
  }
});

module.exports = router;
