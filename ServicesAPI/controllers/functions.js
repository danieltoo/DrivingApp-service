const { DateTime } = require('luxon');
var cb = require('ocb-sender')
var ngsi = require('ngsi-parser')

exports.query = async function (req,res) {    
    let query = ngsi.createQuery(req.body);
    await cb.getWithQuery(query)
    .then((result) => {
        res.set(result.headers)
        res.status(200).json(result.body);
    })
    .catch((error) =>{
        res.status(500).send(error);
    })
} 

exports.pointCampus= function (req,res) {
    let body = req.body;
    let Point = body.point
    let Polygon = body.polygon
    x = Point[0]
	y = Point[1]
    let j = Polygon.length - 1
    let inzone = false

    for (let i = 0 ; i<= Polygon.length-1 ; i++){
    	if( (Polygon[i][1] < y && Polygon[j][1] >= y) || (Polygon[j][1] < y && Polygon[i][1] >= y)){
    		if (Polygon[i][0] + (y - Polygon[i][1]) / (Polygon[j][1] - Polygon[i][1]) * (Polygon[j][0] - Polygon[i][0]) < x) {
    			inzone = !inzone
    		}
    	}
    	j=i

    }

    res.json({inzone});
}
