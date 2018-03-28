
const Sequelize = require('sequelize');

var sequelize = require('../utils/config');

var road = sequelize.define('Road', {
	idSubzone : { 
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
    alternateName:{
        type: Sequelize.STRING
    },
    description:{
        type: Sequelize.TEXT
    },
    lenght:{
        type: Sequelize.NUMBER
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
});
module.exports = road;