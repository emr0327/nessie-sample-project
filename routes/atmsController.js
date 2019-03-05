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
  console.log("atms route");
  res.send("List of ATMs soon to come");
});

module.exports = router;