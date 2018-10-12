var parking = require('../../models/offStreetParking.model')
var road = require('../../models/road.model')
var roadSegment = require('../../models/roadSegment.model')

afterDeleteZone = async (idZone) =>{
    parking.findAll({ where: {
        areaServed : idZone
    }}).then(result => {
        result.map(park => {
            afterDeleteParking(park.dataValues.idOffStreetParking)
        })
    })
    
    parking.update({
		status : 0,
		dateModified : new Date()
	}, {
		where: {
			areaServed : idZone
		}
	})
	.then((result) => {
		//console.log(result + "Eliminated Parkings")
	})
    
   
    road.findAll({ where: {
        responsible : idZone
    }}).then(result => {
        result.map(r => {
            afterDeleteRoad(r.dataValues.idRoad)
        })
    })
    
    road.update({
		status : 0,
		dateModified : new Date()
	}, {
		where: {
			responsible : idZone
		}
	})
	.then((result) => {
		//console.log(result + "Eliminated roads")
	})
    
}


afterDeleteParking = async (idOffStreetParking) => {
    road.findAll({ where: {
        responsible : idOffStreetParking
    }}).then(result => {
        result.map(r => {
            afterDeleteRoad(r.dataValues.idRoad)
        })
    })
    
    road.update({
		status : 0,
		dateModified : new Date()
	}, {
		where: {
			responsible : idOffStreetParking
		}
	})
	.then((result) => {
		//console.log(result + "Eliminated roads")
	})
}


afterDeleteRoad = (idRoad) => {
    roadSegment.update({
		status : 0,
		dateModified : new Date()
	}, {
		where: {
			refRoad : idRoad
		}
	})
	.then((result) => {
		//console.log(result + "Eliminated roadSegements")
	})
}

exports.afterDeleteZone = afterDeleteZone;
exports.afterDeleteParking = afterDeleteParking;
exports.afterDeleteRoad = afterDeleteRoad;