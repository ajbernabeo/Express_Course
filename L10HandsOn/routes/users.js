var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../service/auth');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Create new user if one doesn't exist
router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: { Username: req.body.username },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: authService.hashPassword(req.body.password) 
      }
    })
    .spread(function(result, created) {
      if (created) { res.send('User successfully created'); } 
      else { res.send('This user already exists'); }
    });
});

// Login user and return JWT as cookie
router.post('/login', function (req, res, next) {
  models.users
    .findOne({ where: { Username: req.body.username } })
    .then(user => {
      if (!user) {
        console.log('User not found')
        return res.status(401).json({
          message: "Login Failed"
        });
      } else {
        let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
        if (passwordMatch) {
          let token = authService.signUser(user);
          res.cookie('jwt', token);
          res.send('Login successful');
        } else {
          console.log('Wrong password');
          res.send('Wrong password');
        }
      }
    });
});

//Logout
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
});

module.exports = router;
