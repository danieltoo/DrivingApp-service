
/**
 * Convert a string of coordinates to array
 * @param {string} location 
 */
exports.getPoly = (location)  => {
    location = location.split(";")
    for( let item in location){
        location[item] = location[item].split(",")
        location[item][0] = Number(location[item][0])
        location[item][1] = Number(location[item][1])
    }
    return location
}

/**
 * Convert the simple location string to array
 * @param {string} location
 */
exports.getPoint = (location)  => {
    location = location.split(",")
    location[0] = Number(location[0]) 
    location[1] = Number(location[1])
    return location
}

