var parking = require('../../models/offStreetParking.model')
var road = require('../../models/road.model')
var roadSegment = require('../../models/roadSegment.model')

/**
 * Used to simulate the triggers of linked tables
 */

 /**
  * Used when a zone will be deleted 
  * @param idZone
  */
afterDeleteZone = async (idZone) =>{
	/**
	 * Find all the parking linked to the zone
	 */
    parking.findAll({ where: {
        areaServed : idZone
    }}).then(result => {
        result.map(park => {
            afterDeleteParking(park.dataValues.idOffStreetParking)
        })
    })
    /**
	 * Delete the parkings linked to the zone
	 */
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

	/**
	 * Find all roads linked to the zone
	 */
    road.findAll({ where: {
        responsible : idZone
    }}).then(result => {
        result.map(r => {
            afterDeleteRoad(r.dataValues.idRoad)
        })
    })
	
	/**
	 * Delete all the roads linked to the zone 
	 */
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

/**
  * Used when a parking will be deleted 
  * @param idOffStreetParking
  */
afterDeleteParking = async (idOffStreetParking) => {
	/**
	 * Find all the roads linked to the parking
	 */
    road.findAll({ where: {
        responsible : idOffStreetParking
    }}).then(result => {
        result.map(r => {
            afterDeleteRoad(r.dataValues.idRoad)
        })
    })
	/**
	 * Delete all the roads linked to the parking
	 */
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

/**
  * Used when a road will be deleted 
  * @param idZone
  */
afterDeleteRoad = (idRoad) => {
	/**
	 * Delete all RoadSegments linked to the road
	 */
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