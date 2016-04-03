var express = require('express');
var router = express.Router();
var isActive = require('../helpers/isActive');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Home | Biz Dir',
    is_active: isActive('home')
  });
});

module.exports = router;
