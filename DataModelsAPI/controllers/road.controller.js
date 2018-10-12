'use strict';

var road = require('../models/road.model')
var context = require("./functions/context")
var triggers = require("./functions/triggers");


function isEmpty (object) {
    if (object == undefined ) return true;
    if (object == null) return true;
    if (object.length === 0)  return true;
    if (typeof object === 'string' && object === "") return true;
    return false;
}

exports.add = async function (req, res){
	var body = req.body;
	let type = "Road";
	body[`id${type}`] = `${type}_${Date.now()}`;

	if (!isEmpty(body)) {
		road.create(body)
		.then((result)=> {
			var data  = result.get({
				plain: true
			})
			context.create("Road", data, (status, entity) => {
				if(status){
					res.status(201).json(entity);
				}
				else{
					res.status(400).json({message: "An error has ocurred to send the entity to ContextBroker"});
				}
			})
		})
		.catch(err => {
			res.status(400).json(err["errors"])
		})
	}
	else{
		res.status(400).json({message: "Bad request"});
	}
}

exports.update = function(req, res){
	var body = req.body;
	if(!isEmpty(body)){ 
		body["dateModified"] = new Date();
		road.update(body, {
			where: {
				idRoad: req.params.idRoad
			}
		})
		.then((result) => {
			if(result[0] > 0){
				res.status(200).json(result);
			}else {
				res.status(404).json({message: "The entity cannot be updated", error: data});
			}
		})
	}
	else{
		res.status(400).json({message: "Bad request"});
	}
}

exports.delete = function(req, res){
	road.update({
		status : 0,
		dateModified : new Date()
	}, {
		where: {
			idRoad: req.params.idRoad
		}
	})
	.then((result) => {
		if(result[0] > 0){
			triggers.afterDeleteRoad(req.params.idRoad);			
			res.status(200).json(result);
		}
		else {
			res.status(404).json({message: "The entity cannot be updated"});
		}
	})
}

exports.getAll = function(req,res){
	road.findAll({ where: req.query}).then(result => {
		res.status(200).json(result);
	})
}

exports.getById = function (req, res){
	road.findById(req.params.idRoad).then((result) => {
		if(result){
			let json = result.get({
				plain: true
			})
			res.status(200).json(json);
		}
		else{
			res.status(400).json({message: "An error has ocurred", error: result});
		}
	})
}