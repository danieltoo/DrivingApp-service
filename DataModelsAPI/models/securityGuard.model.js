
var Sequelize = require('sequelize');
var sequelize = require('../db/sequelize');

var guard = sequelize.define('authUser', {
	id : { 
		type : Sequelize.INTEGER, //Sequelize.STRING(100),  
		primaryKey: true,
		get() {
			return this.getDataValue('id').toString();
		}
   },
	first_name        : {
		type: Sequelize.STRING(200),
		allowNull : false
	},
  last_name         : {
		type : Sequelize.STRING(200),
		allowNull : false
	},
  email            : {
		type : Sequelize.STRING(512),
		allowNull : false
	},
  password         : {
		type : Sequelize.STRING(512),
		allowNull : false
	},
  address          : {
		type : Sequelize.STRING(512)
	},
  phonenumber      : {
		type : Sequelize.TEXT,
		allowNull : false
	},
	datecreated : { 
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW
	},
	datemodified : { 
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW 
	},
	status : { 
		type: Sequelize.CHAR(1),
		defaultValue: "1"
	}
},
{ freezeTableName: true});
guard.sync();
module.exports = guard;
