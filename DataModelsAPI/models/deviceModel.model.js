
const Sequelize = require('sequelize');
var sequelize = require('../db/sequelize');

/**
 * Definition of the deviceModel model 
 */
var deviceModel = sequelize.define('deviceModel', {
	idDeviceModel: { 
		type : Sequelize.STRING(100), 
		primaryKey: true,
	},
	type: { 
		type: Sequelize.STRING,
		defaultValue: "DeviceModel"
	},
	category: { 
        type: Sequelize.TEXT,
        allowNull: false	
    },
    brandName:{
        type: Sequelize.TEXT
    },
    manufacturerName:{
		type: Sequelize.TEXT
	},
	modelName:{
		type: Sequelize.TEXT
	},
	dateCreated: { 
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW
	},
	status: { 
		type: Sequelize.CHAR(1),
		defaultValue: "1"
	}
},
{ freezeTableName: true});
device.sync() 
module.exports = device;