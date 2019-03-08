var express = require('express');
var router = express.Router();
var rp = require("request-promise-native");

var data = require("../models/geo_data").seededGeoData;
const { BASE_URL, API_KEY_PARAM } = require('../config');

// INDEX ROUTE
router.get('/', (req, res, next) => {
  res.render('atm/index');
});

// form triggers a post route which calls a GET to the atms endpoint
router.post('/', (req, res, next) => {
  var desiredZipcode = req.body.zipcode;
  for (let value of Object.values(data)) {
    if (value.zipcode == desiredZipcode) {
      req.body.latitude = parseFloat(value.latitude);
      req.body.longitude = parseFloat(value.longitude);
    }
  }; 
  if (req.body.latitude && req.body.longitude) {
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
  } else {
    res.render('partials/noATMsFound', {
      zipcode: req.body.zipcode
    });
  }
  
});

// SHOW ROUTE for unique ATM
router.get('/:id', (req, res, next) => {
  res.render('atm/show', {
    atm_id: req.params.id
  });
})

module.exports = router;