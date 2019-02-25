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

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index');
  rp(options)
    .then(customers => {
      res.render('index', {
        customers
      });
    })
    .catch(err => {
      // API call failed...
    });
});

module.exports = router;

// var request = require('superagent');
// request.get('http://api.reimaginebanking.com/?key=your_key').end(function (res) {
//   foo(res.status);
//   bar(res.body); //do something
// });
