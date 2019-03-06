var express = require('express');
var router = express.Router();
var rp = require("request-promise-native");

var data = require("../models/geo_data").seededGeoData;
const { BASE_URL, API_KEY_PARAM } = require('../config');


var options = {
  uri: BASE_URL + '/customers',
  qs: {
    key: API_KEY_PARAM // -> uri + '?access_token=xxxxx%20xxxxx'
  },
  headers: {
    'User-Agent': 'Request-Promise-Native'
  },
  json: true // Automatically parses the JSON string in the response
};

// INDEX ROUTE
router.get('/', (req, res, next) => {
  res.render('atm/index');
});

router.post('/', (req, res, next) => {
  var desiredZipcode = req.body.zipcode;
  console.log("I posted to the atm post controller");
  for (let value of Object.values(data)) {
    if (value.zipcode == desiredZipcode) {
      console.log("We found a match " + value.zipcode);
    }
  }
  res.redirect('/');
});

module.exports = router;