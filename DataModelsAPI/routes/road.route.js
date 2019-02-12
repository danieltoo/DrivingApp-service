'use strict';
var express = require('express');
var app = express();
//Import the controllers
var controller = require('../controllers/road.controller');

app.route('/road')
    .get(controller.getAll) // /zones?status =  1 || /zones?status=0
    .post(controller.add)  
app.route('/road/:idRoad')
    .get(controller.getById)
    .put(controller.update)
    .delete(controller.delete)

module.exports = app;