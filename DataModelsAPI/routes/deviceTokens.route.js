'use strict';
var express = require('express');
var app = express();
//Import the controllers
var controller = require('../controllers/deviceToken.controller');

app.route('/device/token')
    .get(controller.getAll) // /zones?status =  1 || /zones?status=0
    .post(controller.add)  
app.route('/device/token/:refDevice')
    .get(controller.getById)
    .put(controller.update)
    .delete(controller.delete)

module.exports = app;