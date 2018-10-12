
const Sequelize = require('sequelize');

var sequelize = require('../db/sequelize');
var Zone = require('./zone.model');
var locations = require('./functions/locations')

var parking = sequelize.define('offStreetParking', {
	idOffStreetParking: { 
		type : Sequelize.STRING(100), 
		primaryKey: true,
	},
	type: { 
		type: Sequelize.STRING,
        defaultValue: "OffStreetParking"
	},
	name: {
		type : Sequelize.STRING,
		allowNull: false
	},
	category: { 
		type: Sequelize.TEXT,
		set(category) {
			this.setDataValue('category', category.join(","));
		},
		get() {
			if (this.getDataValue('category') != undefined)
				return this.getDataValue('category').split(',')
		}	
	},
	location:{
		type: Sequelize.TEXT,
		allowNull: false,
		set(location) {
			this.setDataValue('location', location.join(";"));
		},
		get() {
			if (this.getDataValue('location') != undefined)
				return locations.getPoly(this.getDataValue('location'))
		}
	},
	description: {
		type:Sequelize.TEXT
    },
    areaServed:{
        type: Sequelize.STRING(100),
	allowNull: false,
    },
	dateCreated: { 
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW
	},
	dateModified: { 
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW 
	},
	status : { 
		type: Sequelize.CHAR(1),
		defaultValue: "1"
	}
},
{ freezeTableName: true});
parking.sync() 
module.exports = parking;
