
const Sequelize = require('sequelize');
var sequelize = require('../db/sequelize');
var locations = require('./functions/locations');

/**
 * Definition of the device model 
 */
var device = sequelize.define('Device', {
	idDevice: { 
		type : Sequelize.STRING(100), 
		primaryKey: true,
	},
	type: { 
		type: Sequelize.STRING,
		defaultValue: "Device"
	},
	category: { 
        type: Sequelize.TEXT,
        allowNull: false	
    },
    ipAddress:{
        type: Sequelize.TEXT
    },
	location:{
		type: Sequelize.TEXT,
		allowNull: false,
		set(location) {
			this.setDataValue('location', location.join(";"));
		},
		get() {
			return locations.getPoly(this.getDataValue('location'))
		}
    },
    osVersion:{
        type: Sequelize.TEXT
    },
    owner:{
        type: Sequelize.TEXT
    },
    refDeviceModel:{
        type: Sequelize.STRING(100)
    },
    serialNumber:{
        type: Sequelize.TEXT
    },
	dateCreated: { 
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW
	},
	dateModified: { 
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