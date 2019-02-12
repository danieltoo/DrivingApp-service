var cb = require('ocb-sender');
var ngsi = require('ngsi-parser');

/**
 * Used to create the entity on the Orion if is neccesary
 */
exports.create = async (type, json, callback) =>{
        json["id"] = json[`id${type}`]
        delete json[`id${type}`] ;
        delete json["status"]
        json["dateCreated"] = new Date(json.dateCreated),
        json["dateModified"] = new  Date(json.dateModified)	
        let NGSIentity = ngsi.parseEntity(json)
        console.log("Enviando al context")
        callback(true, NGSIentity);
        //UNCOMMENT
        /*await cb.createEntity(NGSIentity)
        .then((result) => {
            console.log(result)
            callback(true, NGSIentity);
        })
        .catch((err) => {
            callback(false, {message: err});
        })*/
}
