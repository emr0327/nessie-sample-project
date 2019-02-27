var express = require('express');
var router = express.Router();
var rp = require("request-promise-native");

const { BASE_URL, API_KEY_PARAM } = require('../config');

var options = {
  uri: BASE_URL+'/customers',
  qs: {
    key: API_KEY_PARAM // -> uri + '?access_token=xxxxx%20xxxxx'
  },
  headers: {
    'User-Agent': 'Request-Promise-Native'
  },
  json: true // Automatically parses the JSON string in the response
};

var customers = {
  uri: BASE_URL + '/customers/',
  qs: {
    key: API_KEY_PARAM // -> uri + '?access_token=xxxxx%20xxxxx'
  },
  headers: {
    'User-Agent': 'Request-Promise-Native'
  },
  json: true // Automatically parses the JSON string in the response
}

var accounts = {
  uri: BASE_URL + '/customers',
  qs: {
    key: API_KEY_PARAM // -> uri + '?access_token=xxxxx%20xxxxx'
  },
  headers: {
    'User-Agent': 'Request-Promise-Native'
  },
  json: true // Automatically parses the JSON string in the response
}

// GET home page.
router.get('/', function(req, res, next) {
  // res.render('index');
  rp(options)
    .then(customers => {
      console.log(typeof(customers))
      res.render('index', {
        customers
      });
    })
    .catch(err => {
      // API call failed
      res.send(err)
    });
});

// SHOW ROUTE
router.get("/:id", (req, res) => {
  // res.send('SHOW ME THE MONEY');
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
        accounts
      });
    })
    .catch(err => {
      // API call failed
      res.send(err)
    });
});

module.exports = router;
