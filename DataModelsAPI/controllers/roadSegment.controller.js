'use strict';

var roadSegment = require('../models/roadSegment.model')
var context = require("./functions/context")

/**
 * Check if the object is empty
 * @param {object} object  
 */
function isEmpty (object) {
    if (object == undefined ) return true;
    if (object == null) return true;
    if (object.length === 0)  return true;
    if (typeof object === 'string' && object === "") return true;
    return false;
}

/**
 * Add a new road segment into the data base
 * @param {*} req User request
 * @param {*} res Server response 
 */
exports.add = async function (req, res){
	var body = req.body;
	let type = "RoadSegment";
	body[`id${type}`] = `${type}_${Date.now()}`;

	if (!isEmpty(body)) {
		roadSegment.create(body)
		.then((result)=> {
			var data  = result.get({
				plain: true
			})
			data['location'] = data['location'].join(';')
			data.location  = {
				type: "geo:polyline",
				value: data['location'].split(";")
			}
			context.create("RoadSegment", data, (status, entity) => {
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

/**
 * Update a road segment
 * @param {*} req User request
 * @param {*} res Server response
 */
exports.update = function(req, res){
	var body = req.body;
	
	if(!isEmpty(body)){ 
		body["dateModified"] = new Date();
		roadSegment.update(body, {
			where: {
				idRoadSegment: req.params.idRoadSegment
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

/**
 * Delete a road segment from the data base 
 * @param {*} req User request
 * @param {*} res Server response
 */
exports.delete = function(req, res){
	roadSegment.update({
		status : 0,
		dateModified : new Date()
	}, {
		where: {
			idRoadSegment: req.params.idRoadSegment
		}
	})
	.then((result) => {
		if(result[0] > 0){
			res.status(200).json(result);
		}
		else {
			res.status(404).json({message: "The entity cannot be updated"});
		}
	})
}

/**
 * Retrieve all the road Segments registered
 * @param {*} req User request
 * @param {*} res Server response
 */
exports.getAll = function(req,res){
	roadSegment.findAll({ where: req.query}).then(result => {

		res.status(200).json(result);
	})
}

/**
 * Retrieve a specific road Segments registered by id
 * @param {*} req User request
 * @param {*} res Server response
 */
exports.getById = function (req, res){
	roadSegment.findById(req.params.idRoadSegment).then((result) => {
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