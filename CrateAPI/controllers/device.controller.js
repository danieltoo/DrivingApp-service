'use strict';

var crate = require('node-crate');

/**
 * Retreive the last device data found using the parameters owner, data and time 
 * @param req
 * @param res
 */
exports.read_deviceByOwnerDateTime= function(req, res) {
    let owner = req.query['owner'];
    let date = req.query['date'];
    let time = req.query['time'];
    /**
     * Get the device data from crateDB
     */
    crate.execute("select * from etdevice where owner=? and date_format(time_index) like ? order by date_format(time_index) desc limit 1",[owner, date+'T'+time+'%'])
    .then((result) => {
        var entidad;
        console.log('Success', result.json, result.rowcount)
        entidad = result.json;
        if(entidad.length > 0) {
            let coordinatesConverted = [];
            coordinatesConverted.push(entidad[0]['location'][1], entidad[0]['location'][0])
            entidad[0]['location'] = coordinatesConverted
        }
        console.log(entidad);
        res.status(200).json(entidad);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
};

