
const Sequelize = require('sequelize');
var sequelize = require('../db/sequelize');

/**
 * Definition of the DeviceToken model 
 */
var DeviceToken = sequelize.define('deviceTokens', {
	idDeviceToken : { 
		type : Sequelize.STRING(100), 
		primaryKey: true,
	},
	refDevice : { 
		type: Sequelize.STRING,
		allowNull : false
	},
	fcmToken: {
		type : Sequelize.STRING,
		allowNull: false
	},
	preferences :{
		type : Sequelize.STRING,
		allowNull : false,
		defaultValue : "All"
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
DeviceToken.sync() 
module.exports = DeviceToken;