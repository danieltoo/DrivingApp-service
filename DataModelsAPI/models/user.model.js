
const Sequelize = require('sequelize');
var sequelize = require('../db/sequelize');

/**
 * Definition of the User model 
 */
var user = sequelize.define('mobileUser', {
	id : { 
		type : Sequelize.STRING(100), 
		primaryKey: true,
    },
    firstName        : {
		type: Sequelize.STRING(200),
		allowNull : false
	},
    lastName         : {
		type : Sequelize.STRING(200),
		allowNull : false
	},
    email            : {
		type : Sequelize.STRING(100),
		allowNull : false
	},
    userName         : {
		type: Sequelize.STRING(50)
	},
    password         : {
		type : Sequelize.STRING(50),
		allowNull : false
	},
    address          : {
		type : Sequelize.STRING(200)
	},
    phoneNumber      : {
		type : Sequelize.STRING(20),
		allowNull : false
	},
	dateCreated : { 
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW
	},
	dateModified : { 
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW 
	},
	status : { 
		type: Sequelize.CHAR(1),
		defaultValue: "1"
	}
},
{ freezeTableName: true});
user.sync() 
module.exports = user;
