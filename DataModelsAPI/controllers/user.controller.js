'use strict';

var User = require('../models/user.model')
var Guard = require('../models/securityGuard.model')
var fetch = require('node-fetch')
var keyrock = require('../../config/config').keyrock

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
 * Headers used to manipulate the data of the keystone
 */
var headers = {
	"accept": "application/json",
	"accept-encoding": "gzip, deflate",
	"accept-language": "en-US,en;q=0.8",
	"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36",
	"content-type": "application/json",
	"X-Auth-token": "ADMIN"
}

/**
 * Add a new user into the data base and the keystone
 * @param {*} req User request
 * @param {*} res Server response 
 */
exports.add = function (req, res){
	var body = req.body;
	let type = "User";
	body[`id`] = `${type}_${Date.now()}`;
	/**
	 * Cut the phone number 
	 */
	body.phoneNumber = body.phoneNumber.substring(1, body.phoneNumber.length)
	if (!isEmpty(body)) {

		let payload = {
			"user": {
				"name": body.phoneNumber,
				"domain_id": "default",
				"email": body.email,
				"enabled": true,
				"password": body.password,
				"firstname": body.firstName ,
				"lastname": body.lastName,
				"username" : body.phoneNumber
			}
		}
		let options = {
			method: 'POST',
			headers: headers,
			body : JSON.stringify(payload)
		};
		/**
		 * Create a user into the keystone
		 */
		fetch(`${keyrock}/v3/users`, options)
		.then(function(response) {              
			if(response.status >= 200 && response.status <= 208){
				User.create(body)
				.then((result)=> {
					var data  = result.get({
						plain: true
					})
					res.status(201).json(data);	
				})
				.catch(err => {
					res.status(400).json(err)
				})
			}else{
				res.status(400).send(response.status)
			}
		})
		.catch((err) => {
			console.error(err)
			res.status(404).send(err)
		});
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
		User.update(body, {
			where: {
				id: req.params.id
			}
		})
		.then((result) => {
			if(result[0] > 0){
				res.status(200).json(result);
			}else {
				res.status(404).json({message: "The user cannot be updated", error: data});
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
	User.update({
		status : 0,
		dateModified :new Date()
	}, {
		where: {
			id: req.params.id
		}
	})
	.then((result) => {
		if(result[0] > 0){
			res.status(200).json(result);
		}else {
			res.status(404).json({message: "The user cannot be updated"});
		}
	})
}

/**
 * Retrieve all the road Segments registered
 * @param {*} req User request
 * @param {*} res Server response
 */
exports.getAll = function(req,res){
	console.log(req.query)
	User.findAll({ where: req.query}).then(result => {
		res.status(200).json(result);
	})
}

/**
 * Retrieve a specific Segments registered
 * @param {*} req User request
 * @param {*} res Server response
 */
exports.getById = function (req, res){
	User.findById(req.params.id).then((result) => {
		if (result){
			res.status(200).json(result.get({
				plain: true
			}));
		}else {
			res.status(400).json({message: "Not found", error: result});
		}
	})
}

/**
 * Login using the keystone to get a token
 * @param {*} req User request
 * @param {*} res Server response
 */
exports.keyLogin = (req, res) => {
	var params = req.body;
	var phoneNumber = params.phoneNumber;
	var name = params.phoneNumber;
	var password = params.password;
	console.log(params)

	if(!isEmpty(phoneNumber)){

		let payload  = {
			"auth": {
				"identity": {
					"methods": [
						"password"
					],
					"password": {
						"user": {
							"domain": {
								"id": "default"
							},
							"id": name,
							"password": password
						}
					}
				}
			}
		}

		let options = {
			method: 'POST',
			headers: headers,
			body : JSON.stringify(payload)
		};
		/**
		 * Make the request to login in the keystone
		 */
		fetch(`${keyrock}/v3/auth/tokens`, options)
			.then(function(response) {              
				if(response.status >= 200 && response.status <= 208){
					User.findOne({where : { phoneNumber : phoneNumber}})
					.then((result) =>{
						let user = result.get({
							plain: true
						})
						let token = response.headers._headers['x-subject-token'][0];
						console.log(token)
						res.status(200).json({token, user})
					})
					.catch((err) => {
						res.status(404).json(err)
					})
					
				}else{
					res.status(404).send("The password you've entered is incorrect")
				}
			})
			.catch((err) => {
				res.status(404).send(err)
			});
	}else{
		res.status(400).json(["Empty fields required"]);
	}
} 

/**
 * Used to make security guar login using the keystone and the Viva data base
 * @param {*} req User request
 * @param {*} res Server response
 */
exports.keyGuardLogin = (req, res) => {
	var params = req.body;
	//var phoneNumber = params.phoneNumber;
	var name = params.email;
	var password = params.password;

	if(!isEmpty(name)){

		let payload  = {
			"auth": {
				"identity": {
					"methods": [
						"password"
					],
					"password": {
						"user": {
							"domain": {
								"id": "default"
							},
							"name": name,
							"password": password
						}
					}
				}
			}
		}

		let options = {
			method: 'POST',
			headers: headers,
			body : JSON.stringify(payload)
		};
		/**
		 * MAke the request to login in the keystone
		 */
		fetch(`${keyrock}/v3/auth/tokens`, options)
			.then(function(response) {              
				if(response.status >= 200 && response.status <= 208){

					/**
					 * Use the model Guard that is connected with the viva data base to get the data
					 */
					Guard.findOne({where : { email : name}})
					.then((result) =>{
						let user = result.get({
							plain: true
						})
						user["id"] = user["id"].toString();
						user["firstName"] = user["first_name"];
						user["lastName"] = user["last_name"];
						user["phoneNumber"] = user["phonenumber"];
						user["dateCreated"] = user["datecreated"];
						user["dateModified"] = user["datemodified"];

						delete user["first_name"];
						delete user["last_name"];
						delete user["phonenumber"];
						delete user["datecreated"];
						delete user["datemodified"];
						
						console.log(user);
						let token = response.headers._headers['x-subject-token'][0];
						res.status(200).json({token, user})
					})
					.catch((err) => {
						res.status(404).json(err)
					})
					
				}else{
					res.status(404).send("The password you've entered is incorrect")
				}
			})
			.catch((err) => {
				console.error(err)
				res.status(404).send(err)
			});
	}else{
		res.status(400).json(["Empty fields required"]);
	}
}
