'use strict';

var express     = require('express');
var app         = express();

//Import the controllers
var controller = require('../controllers/user.controller');
app.route('/user')
    .get(controller.getAll) // /zones?status =  1 || /zones?status=0
    .post(controller.add)  
app.route('/user/:id')
    .get(controller.getById)
    .put(controller.update)
    .delete(controller.delete)
app.route('/user/login')
    .post(controller.keyLogin)
app.route('/guard/login')
    .post(controller.keyGuardLogin)

module.exports = app;