var express = require('express');
var router = express.Router();
var isActive = require('../helpers/isActive');
var Business = require('../models/business');

router.get('/', function(req, res) {
  Business.find(function(err, businesses) {
    if (err) {
      res.end(err);
    } else {
      res.render('directory/index', {
        title: 'Directory | Biz Dir',
        is_active: isActive('directory'),
        businesses: businesses,
        shorten: shorten
      });
    }
  });
  function shorten(text, maxLen) {
    if (text.length > maxLen) {
      text = text.substr(0, maxLen-3) + '...';
    }
    return text;
  }
});

router.get('/edit', function(req, res) {
  Business.find(function(err, businesses) {
    if (err) {
      res.end(err);
    } else {
      res.render('directory/edit', {
        title: 'Edit Directory | Biz Dir',
        is_active: isActive('edit'),
        businesses: businesses
      });
    }
  });
});

router.get('/add', function(req, res) {
  res.render('directory/add', {
    title: 'Add Business | Biz Dir',
    is_active: isActive('edit')
  });
});

router.get('/:business_id/edit', function(req, res) {
  Business.findById(req.params.business_id, function(err, business) {
    if (err) {
      res.end(err);
    } else {
      res.render('directory/form', {
        title: 'Editing.. | Biz Dir',
        is_active: isActive('edit'),
        business: business
      });
    }
  });
});

router.post('/create', function(req, res) {
  var form = req.body;
  var business = new Business({
    name: form.name,
    description: form.description,
    website: form.website,
    phone: form.phone,
    email: form.email,
    owner: form.owner
  });
  business.save(function(err, business) {
    if (err) {
      res.end(err);
    } else {
      res.redirect('/directory/edit');
    }
  });
});

router.post('/:business_id/update', function(req, res) {
  var form = req.body;
  Business.update({ _id: req.params.business_id }, {
    name: form.name,
    phone: form.phone,
    owner: form.owner,
    website: form.website,
    email: form.email,
    description: form.description
  }, function(err) {
    if (err) {
      res.end(err);
    } else {
      res.redirect('/directory');
    }
  });
});

router.get('/:business_id/remove', function(req, res) {
  Business.remove({ _id: req.params.business_id }, function(err) {
    if (err) {
      res.end(err);
    } else {
      res.redirect('/directory/edit');
    }
  });
});

module.exports = router;
