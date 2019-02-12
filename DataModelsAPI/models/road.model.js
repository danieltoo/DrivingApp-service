
const Sequelize = require('sequelize');
var sequelize = require('../db/sequelize');

/**
 * Definition of the road model 
 */
var road = sequelize.define('road', {
	idRoad : { 
		type : Sequelize.STRING(100), 
		primaryKey: true,
	},
	type : { 
		type: Sequelize.STRING,
		defaultValue: "Road"
	},
	name : {
		type : Sequelize.STRING,
		allowNull: false
    },
    description:{
        type: Sequelize.TEXT
    },
    responsible:{
        type: Sequelize.TEXT,
        allowNull: false
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
road.sync() 
module.exports = road;