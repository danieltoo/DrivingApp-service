
const Sequelize = require('sequelize');

var sequelize = require('../utils/config');

var zone = sequelize.define('Zone', {
	idZone: { 
		type : Sequelize.STRING(100), 
		primaryKey: true,
	},
	type : { 
		type: Sequelize.STRING,
		defaultValue: "Building"
	},
	refBuildingType : { 
		type: Sequelize.STRING,
		defaultValue: "Zone"
	},
	name : {
		type : Sequelize.STRING,
		allowNull: false
	},
	category : { 
		type: Sequelize.TEXT
	},
	location:{
		type: Sequelize.TEXT,
		allowNull: false
	},
	centerPoint:{
		type:Sequelize.TEXT,
		allowNull:false
	},
	dateCreated : { 
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW
	},
	address: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	description: {
		type:Sequelize.TEXT
	},
	dateModified : { 
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW 
	},
	status : { 
		type: Sequelize.CHAR(1),
		defaultValue: "1"
	}
});
zone.sync() 
module.exports = zone;