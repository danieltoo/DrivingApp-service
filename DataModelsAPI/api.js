
var express     = require('express');
var app         = express();


var zoneRoute  					= require('./routes/zone.route');
var parkingRoute				= require('./routes/offStreetParking.route');
var roadRoute 					= require('./routes/road.route')
var roadSegmentRoute 			= require('./routes/roadSegment.route')
var deviceTokens = require('./routes/deviceTokens.route')
var user = require('./routes/user.route')

app.route('/')
	.get((req, res, next) => {res.json({ message: 'Welcome to DataModels API REST' });
});


app.use(zoneRoute)
app.use(parkingRoute)
app.use(roadRoute)
app.use(roadSegmentRoute)
app.use(deviceTokens)
app.use(user)

module.exports = app;