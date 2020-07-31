var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('../services/passport');

//SIGNUP
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {UserName: req.body.username},
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Username: req.body.username,
        Email: req.body.email,
        Password: req.body.password
      }
    })
    .spread(function(result, created) {
      if (created) { res.redirect('login'); }
      else { res.send('This user already exists'); }
    });
});

//LOGIN
router.get('/login', function(req, res, next) { res.render('login'); });

router.post('/login', 
            passport.authenticate('local', { failureRedirect: '/users/login' }), 
            function(req, res, next) { res.redirect('profile') });

//PROFILE
let admin;
router.get('/profile', function(req, res, next) {
  if(req.user) {
    models.users
      .findById(parseInt(req.user.UserId))
      .then(user => {
        if(user) { 
          admin = user.Admin;
          res.render('profile', { users: user }); 
        } else { res.send("User not found"); }
      });
  } else { res.redirect('/users/login'); }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.users
    .findAll({})
    .then(usersFound => {
      if(admin) { res.render('users', { users: usersFound }) }
      else { res.send("YOU SHALL NOT PASS") }
    });
});

/* GET user info. */
router.get('/:id', function(req, res, next) {
  models.users
    .findByPk(parseInt(req.params.id))
    .then(userFound => {
      res.render('specificUser', { users:userFound })
    });
});