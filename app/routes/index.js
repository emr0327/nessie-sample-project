var express = require('express');
var router = express.Router();
var rp = require("request-promise-native");

const { BASE_URL, API_KEY_PARAM } = require('../../config');

var options = {
  uri: BASE_URL+'/customers',
  qs: {
    key: API_KEY_PARAM
  },
  headers: {
    'User-Agent': 'Request-Promise-Native'
  },
  json: true
};

// GET home page.
router.get('/', function(req, res) {
  rp(options)
    .then(customers => {
      res.render('index', {
        customers
      });
    })
    .catch(error => {
      res.render('error', { error });
    });
});

// NEW route
router.get('/:id/accounts/new', (req, res) => {
  res.render('new', {
    customer_id: req.params.id
  });
});

// SHOW ROUTE
router.get('/:id', (req, res) => {
  rp({
    "method": "GET",
    "uri": BASE_URL + '/customers/' + req.params.id + '/accounts/',
    "qs": {
      key: API_KEY_PARAM
    },
    "headers": {
      'User-Agent': 'Request-Promise-Native'
    },
    "json": true
  })
    .then(accounts => {
      res.render('show', {
        customer_id: req.params.id,
        customer_name: req.query.first_name,
        accounts
      });
    })
    .catch(error => {
      res.render('error', { error });
    });
});

// POST route
router.post('/:id/accounts/new', (req, res) => {
  req.body.rewards = parseInt(req.body.rewards);
  req.body.balance = parseInt(req.body.balance);
  rp({
    "method": "POST",
    "uri": BASE_URL + '/customers/' + req.params.id + '/accounts/',
    "qs": {
      key: API_KEY_PARAM
    },
    "body": req.body,
    "headers": {
      'User-Agent': 'Request-Promise-Native',
      'Content-Type': 'application/json'
    },
    "json": true
  })
    .then( () => {
      res.redirect('/' + req.params.id);
    })
    .catch(error => {
      res.render('error', { error });
    });
});

// DELETE route
router.delete('/:id', (req, res) => {
  rp({
    "method": "DELETE",
    "uri": BASE_URL + '/accounts/' + req.params.id,
    "qs": {
      key: API_KEY_PARAM
    },
    "headers": {
      'User-Agent': 'Request-Promise-Native'
    },
    "json": true
  })
    .then(res => {
      res.redirect('/' + req.query.customer_id);
    })
    .catch(error => {
      res.render('error', { error });
    });
});

module.exports = router;
