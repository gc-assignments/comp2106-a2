var express = require('express');
var router = express.Router();
var isActive = require('../helpers/isActive');
var User = require('../models/user');
var passport = require('passport');

router.get('/signup', function(req, res) {
  if (req.isAuthenticated()) res.redirect('/');
  res.render('users/signup', {
    title: 'Sign Up | Biz Dir',
    is_active: isActive('signup'),
    show_alert: req.query.match === 'false',
    authenticated: req.isAuthenticated()
  });
});

router.get('/login', function(req, res) {
  res.render('users/login', {
    title: 'Login | Biz Dir',
    is_active: isActive('login'),
    show_alert: req.query.match === 'false',
    authenticated: req.isAuthenticated()
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/directory/edit',
  failureRedirect: '/users/login?match=false',
}));

router.post('/create', function(req, res, next) {
  var form = req.body;
  if (form.password !== form.confirm) {
    res.redirect('/users/signup?match=false');
  } else {
    var newUser = new User({ username: form.username });
    User.register(newUser, form.password, function(err, user) {
      if (err) return next(err); 
      if (!user) return res.redirect('users/signup?match=false');
      req.login(user, function(err) {
        if (err) return next(err);
        return res.redirect('/directory');
      });
    });
  }
});


module.exports = router;
