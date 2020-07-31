var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var models = require('../models');

router.get('/', function(req, res, next) {
  models.actor
    .findAll({ 
      attributes: ['actor_id', 'first_name', 'last_name'],
      include: [{ 
        attributes: ['film_id', 'title', 'description', 'release_year', 'rating'],
        model: models.film 
      }]
    })
    .then(actorsFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(actorsFound));
    })
});

router.get('/:id', function(req, res, next) {
  models.actor
    .findByPk(parseInt(req.params.id), {
      include: [{model: models.film}]
    })
    .then(actorFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(actorFound));
    })
});

router.post('/', function(req, res, next) {
  models.actor
    .findOrCreate({
      where: {
        first_name: req.body.first_name,
        last_name: req.body.last_name
      }
    }).spread(function(result, created) {
      if(created) {
        res.redirect('/actors/' + result.actor_id);
      } else {
        res.status(400);
        res.send(`${result.first_name} ${result.last_name} already exists`);
      }
    });
});

router.put('/:id', function(req, res, next) {
  let actorId = parseInt(req.params.id);
  models.actor
    .update(req.body, {
      where: {
        actor_id: actorId
      }
    })
    .then(result => res.redirect('/actors/' + actorId))
    .catch(err => {
      res.status(400);
      res.send("there was a problem updating the actor. Please check the actor information.");
    })
});

router.delete('/:id', function(req, res, next) {
  let actorId= req.params.id;
  models.actor
    .destroy({
      where: {
        actor_id: actorId
      }
    })
    .then(result => res.redirect('/actors'))
    .catch(err => {
      res.status(400);
      res.send("There was a problem deleting the actor. Please make sure you are specifying the actor ID.")
    })
});

module.exports = router;