const { DateTime } = require('luxon');
var cb = require('ocb-sender')
var ngsi = require('ngsi-parser')

exports.query = async function (req,res) {    
    let query = ngsi.createQuery(req.body);
    console.log(req.body)
    await cb.getWithQuery(query)
    .then((result) => {
        //res.set(result["headers"]["_headers"])
        //console.log(result["headers"]["_headers"])
        for (header in result.headers._headers){
            console.log(typeof header , typeof result.headers._headers[header][0])
            //res.set(header, header)
        }
        res.status(200).json(result.body);
    })
    .catch((error) =>{
        res.status(500).send(error.message);
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
