var express = require('express');
const mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password1!',
  database: 'sakila'
});

connection.connect(function(err) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Yay! You are connected to the database!');
})

const filmList = `SELECT * FROM film`;

/* GET home page. */
router.get('/film', function(req, res, next) {
  connection.query(filmList, function(err, result) {
    res.render('film', {films: result});
  });
});

router.get('/film/:id', function(req, res, next) {
  let filmId = parseInt(req.params.id);
  let idQuery = `SELECT * FROM film_actor 
                 INNER JOIN film ON film.film_id = film_actor.film_id
                 INNER JOIN actor ON actor.actor_id = film_actor.actor_id 
                 WHERE film.film_id = ${filmId}`;

  connection.query(idQuery, (err, result) => {
    if(result.length > 0) {
      res.render('filmDetails', {film: result[0], actors: result});
    } else {
      res.send(`Film not found. Please choose from ${result.length} films.`);
    }
  });
});

module.exports = router;
