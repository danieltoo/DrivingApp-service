'use strict';

  var express     = require('express')
  var app         = express();
  /**
   * Import the controllers
  */
  var deviceController   = require('../controllers/device.controller');
  
  app.get('/', (req, res, next) => {
    res.json({ message: 'Welcome to CrateDB-QuantumLeap API' })
  });
  //EXAMPLE-SIMPLE GET REQUEST: http://localhost:3700/api/locationOwnerDateTime?owner=41&date=2018-02-08&time=12
  app.get('/locationOwnerDateTime', deviceController.read_deviceByOwnerDateTime);

module.exports = app;