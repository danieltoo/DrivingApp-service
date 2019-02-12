const { DateTime } = require('luxon');
var Zone = require('../../DataModelsAPI/models/zone.model');
var user = require('../../DataModelsAPI/models/user.model');
var cb = require('ocb-sender');
var ngsi = require('ngsi-parser');

/**
 * Retrieve the devices on the zone in the last 15 minutes from the orion
 * @param req
 * @param res
 */
exports.getZone = async function (req,res) {
	let queries = req.query;
	await Zone.findOne({where : { 'idZone': req.params.idZone }})
    .then( async (zone) => {
	  	if (zone != null){
			/**
			 * Use to deteminte the time 15 minutes before
			 */
			//var dt = DateTime.utc();
			var dt = DateTime.local().setZone('America/Mexico_City');
			let fifteenAgo = dt.minus({ minutes: 15 });
			let query = ngsi.createQuery(Object.assign({
				id: "Device_Smartphone_.*",
				type : "Device",
				options : "keyValues",
				georel :"coveredBy",
				geometry:"polygon",
				coords : zone.location,
				dateModified: `>=${fifteenAgo}`
			}, queries));
			/**
			 * Retrieve the devices on the zone in the last 15 minutes from the orion
			 */
			await cb.getWithQuery(query)
			.then((result) => {
				res.status(200).json(result.body)
			})
			.catch((error) =>{
				res.status(500).send(error);
            })
            
	  	}else {
			res.status(404).send("Zone not found");
		}  	
	});
} 


/**
 * Retrieve a specific device by the owner attribute that was on the zone in the last 15 minutes
 * @param req
 * @param res
 */
exports.getZoneByOwner = async function (req,res) {
	let queries = req.query;
	await Zone.findOne({where : { 'idZone': req.params.idZone }})
    .then( async (zone) => {
	  	if (zone != null){
			await user.findOne({ where : queries})
			.then ( async(user) =>{
				if (user!= null){
					/**
					 * Use to deteminte the time 15 minutes before
					 */
					//var dt = DateTime.utc();
					var dt = DateTime.local().setZone('America/Mexico_City');
					let fifteenAgo = dt.minus({ minutes: 15 });
					let query = ngsi.createQuery({
						id: "Device_Smartphone_.*",
						type : "Device",
						options : "keyValues",
						georel :"coveredBy",
						geometry:"polygon",
						coords : zone.location,
						dateModified: `>=${fifteenAgo}`,
						owner : user.id
					});
					/**
					 * Retrieve a specific device by the owner attribute that was on the zone in the last 15 minutes
					 */
					await cb.getWithQuery(query)
					.then((result) => {
						res.status(200).json(result.body)
					})
					.catch((error) =>{
						res.status(500).send(error);
					})
				}else {
					res.status(404).send("User not found");
				}
			})
	  	}else {
			res.status(404).send("Zone not found");
		}  	
	});
} 
