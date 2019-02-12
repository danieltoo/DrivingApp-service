'use strict';

var express     = require('express');
var app         = express();
var routes      = require('./routes/index'); //importing the routes
var config      = require('../config/config'); // get our config file
// Database configuration - connection with crateDBADMIN
var crate = require('node-crate');
crate.connect(config.crate);
/**
 * Add the routes in /crate endpoint
 */
// ROUTES FOR CRATE API
// ===================================================================
app.route('/')
	.get((req, res, next) => {res.json({ message: 'Welcome to CRATE API' });
});
app.use('/', routes);

module.exports = app;