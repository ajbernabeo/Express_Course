var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var models = require('../models');

router.get('/', function(req, res, next) {
    models.film
      .findAll({ 
        attributes: ['film_id', 'title', 'description']
      })
      .then(filmFound => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(filmFound));
      })
});

router.get('/:id', function(req, res, next) {
    models.film
        .findByPk(parseInt(req.params.id), {})
        .then(filmFound => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(filmFound));
        })
});

router.delete('/:id', function(req, res, next) {
    let filmId= req.params.id;
    models.film
      .destroy({
        where: {
          film_id: filmId
        }
      })
      .then(result => res.redirect('/film'))
      .catch(err => {
        res.status(400);
        res.send("There was a problem deleting the film. Please make sure you are specifying the film ID.")
      })
});

module.exports = router;