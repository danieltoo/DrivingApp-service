var express     = require('express');
var app         = express();

var alertsZone = require('../controllers/alertsZone')
var devices = require('../controllers/devices')
var functions = require('../controllers/functions')
/**
 * Routes definition
 */
app.route('/alerts/zone/history/:idZone')
.get(alertsZone.getHistory)

app.route('/alerts/zone/current/:idZone')
.get(alertsZone.getCurrent)

app.route('/alerts/zone/current/hour/:idZone')
.get(alertsZone.getCurrentHour)

app.route('/devices/zone/:idZone')
.get(devices.getZone)

app.route('/devices/zone/:idZone/owner')
.get(devices.getZoneByOwner)

app.route('/query')
.post(functions.query)

app.route('/zone/point')
.post(functions.pointCampus)


module.exports = app;