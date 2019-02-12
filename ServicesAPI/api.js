
var express     = require('express');
var app         = express();
/**
 * Add the routes in the endpoint /services
 */
var routes = require('./routes/index')

app.route('/')
	.get((req, res, next) => {res.json({ message: 'Welcome to Special Services API' });
});

app.use(routes)

module.exports = app;