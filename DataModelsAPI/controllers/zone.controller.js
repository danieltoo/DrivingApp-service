'use strict';

var zone = require('../models/zone.model')
var context = require("./functions/context")
var triggers = require("./functions/triggers")


function isEmpty (object) {
    if (object == undefined ) return true;
    if (object == null) return true;
    if (object.length === 0)  return true;
    if (typeof object === 'string' && object === "") return true;
    return false;
}

exports.add = async function (req, res){
	var body = req.body;
	console.log(body)
	let type = "Zone";
	body[`id${type}`] = `${type}_${Date.now()}`;
	console.log("entro");
	if (!isEmpty(body)) {
		zone.create(body)
		.then((result)=> {
			var data  = result.get({
				plain: true
			})
			data['location'] = data['location'].join(';')
			data.location  = {
				type: "geo:polygon",
				value: data['location'].split(';'),
				metadata:{
					centerPoint:{
						value: data['centerPoint'].join(','),
						type: "geo:point"
					}
				}
			}
			delete data.centerPoint
			context.create("Zone", data, (status, entity) => {
				if(status){
					res.status(201).json(entity);
				}
				else{
					res.status(400).json({message: "An error has ocurred to send the entity to ContextBroker"});
				}
			})

		})
		.catch(err => {
			res.status(400).json(err)
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
		zone.update(body, {
			where: {
				idZone: req.params.idZone
			}
		})
		.then((result) => {
			if(result[0] > 0){
				res.status(200).json(result);
			}else {
				res.status(404).json({message: "The entity cannot be updated", error: result});
			}
		})
	}
	else{
		res.status(400).json({message: "Bad request"});
	}
}

exports.delete = function(req, res){

	zone.update({
		status : 0,
		dateModified : new Date()
	}, {
		where: {
			idZone: req.params.idZone
		}
	})
	.then((result) => {
		if(result[0] > 0){
			triggers.afterDeleteZone(req.params.idZone);
			res.status(200).json(result);
		}
		else {
			res.status(404).json({message: "The entity cannot be updated"});
		}
	})
}

exports.getAll = function(req,res){
	zone.findAll({ where: req.query}).then(result => {
		var temp = [];
		result.map((zone) =>{
			let json = zone.get({
				plain: true
			})
			json["name"] = json["owner"];
			json["refBuildingType"] = "Zone";
			temp.push(json)
		})
		res.status(200).json(temp);
	})
}

exports.getById = function (req, res){
	zone.findById(req.params.idZone).then((result) => {
		if(result){
			let json = result.get({
				plain: true
			})
			json["name"] = json["owner"];
			json["refBuildingType"] = "Zone";
			res.status(200).json(json);
		}
		else{
			res.status(400).json({message: "An error has ocurred", error: result});
		}
	})
}
