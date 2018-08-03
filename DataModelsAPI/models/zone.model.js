
const Sequelize = require('sequelize');

var sequelize = require('../db/sequelize');
var locations = require('./functions/locations')

var zone = sequelize.define('zone', {
	idZone: { 
		type : Sequelize.STRING(100), 
		primaryKey: true,
	},
	type: { 
		type: Sequelize.STRING,
		defaultValue: "Building"
	},
	refBuildingType: { 
		type: Sequelize.STRING,
		defaultValue: "Zone"
	},
	name: {
		type : Sequelize.STRING,
		allowNull: false
	},
	address: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	category: { 
		type: Sequelize.TEXT,
		set(category) {
			if(category !== null){
				this.setDataValue('category', category.join(","));
			}
			else {
				this.setDataValue('category',null);
			}
		},
		get() {
			let category = this.getDataValue('category') 
			if (category !== null && category !==undefined){
				return category.split(',') 
			}
			else {
				return []
			}
		}	
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
	centerPoint:{
		type:Sequelize.TEXT,
		allowNull:false,
		set(center) {
			this.setDataValue('centerPoint', center.join(","));
		},
		get() {
			return locations.getPoint(this.getDataValue('centerPoint'))
		}
	},
	description: {
		type:Sequelize.TEXT
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
{freezeTableName: true});
zone.sync() 
module.exports = zone;
