var express = require('express');
var router = express.Router();
var rp = require("request-promise-native");

const { BASE_URL, API_KEY_PARAM } = require('../config');

// INDEX ROUTE
router.get('/', (req, res) => {
  rp({
    "method": "GET",
    "uri": BASE_URL + '/branches',
    "qs": {
      key: API_KEY_PARAM
    },
    "headers": {
      'User-Agent': 'Request-Promise-Native',
      'Content-Type': 'application/json'
    },
    "json": true
  })
    .then(branches => {
      res.render('branch/branches', {
        branches
      })
    })
    .catch(error => {
      res.render('error', { error });
    });
});

module.exports = router;