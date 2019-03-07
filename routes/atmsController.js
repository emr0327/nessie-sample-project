var express = require('express');
var router = express.Router();
var rp = require("request-promise-native");

var data = require("../models/geo_data").seededGeoData;
const { BASE_URL, API_KEY_PARAM } = require('../config');

// INDEX ROUTE
router.get('/', (req, res, next) => {
  res.render('atm/index');
});

router.post('/', (req, res, next) => {
  var desiredZipcode = req.body.zipcode;
  for (let value of Object.values(data)) {
    if (value.zipcode == desiredZipcode) {
      req.body.latitude = parseFloat(value.latitude);
      req.body.longitude = parseFloat(value.longitude);
    }
  };
  rp({
    "method": "GET",
    "uri": BASE_URL + '/atms',
    "qs": {
      lat: req.body.latitude,
      lng: req.body.longitude,
      rad: parseInt(req.body.radius),
      key: API_KEY_PARAM
    },
    "headers": {
      'User-Agent': 'Request-Promise-Native',
      'Content-Type': 'application/json'
    },
    "json": true
  })
    .then((atms) => {
      res.render('atm/atms', {
        atms: atms.data
      })
    })
    .catch(error => {
      res.render('error', { error });
    });
});

module.exports = router;