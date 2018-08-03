const { DateTime } = require('luxon');
var Zone = require('../../DataModelsAPI/models/zone.model');
var user = require('../../DataModelsAPI/models/user.model')
var cb = require('ocb-sender')
var ngsi = require('ngsi-parser')

exports.getZone = async function (req,res) {
	let queries = req.query;
	await Zone.findOne({where : { 'idZone': req.params.idZone }})
    .then( async (zone) => {
	  	if (zone != null){
			var dt = DateTime.utc();
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
			console.log(query)
			await cb.getWithQuery(query)
			.then((result) => {
				res.status(200).json(result)
			})
			.catch((error) =>{
				res.status(500).send(error);
            })
            
	  	}else {
			res.status(404).send("Zone not found");
		}  	
	});
} 



exports.getZoneByOwner = async function (req,res) {
	let queries = req.query;
	await Zone.findOne({where : { 'idZone': req.params.idZone }})
    .then( async (zone) => {
	  	if (zone != null){
			await user.findOne({ where : queries})
			.then ( async(user) =>{
				if (user!= null){
					var dt = DateTime.utc();
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
					console.log(query)
					await cb.getWithQuery(query)
					.then((result) => {
						res.status(200).json(result)
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
