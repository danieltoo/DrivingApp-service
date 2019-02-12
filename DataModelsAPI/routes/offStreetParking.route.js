'use strict';
var express = require('express');
var app = express();
//Import the controllers
var controller = require('../controllers/offStreetParking.controller');

app.route('/parking')
    .get(controller.getAll) // /zones?status =  1 || /zones?status=0
    .post(controller.add)  
app.route('/parking/:idParking')
    .get(controller.getById)
    .put(controller.update)
    .delete(controller.delete)

module.exports = app;