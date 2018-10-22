<<<<<<< HEAD

exports.keyrock = "http://viva-smartsdk.duckdns.org:8001"
=======
// Local Deployment 
/*exports.keyrock = "http://viva-smartsdk.duckdns.org:8001"
>>>>>>> 4b7e5ae4248d233b62ca3820268e185383a10779
exports.mysql = {
  host : '200.23.5.142',
  db : 'smartsdksecurity',
  user : 'cenidet',
  password : 'Cenidet2017'
}
exports.context = 'http://200.23.5.142:1026/v2';
exports.crate = 'http://200.23.5.142:4200';
<<<<<<< HEAD

/*exports.keyrock = "http://" + process.env.KEYROCK + ":" + process.env.KEYSTONE_PORT
=======
*/

// Docker Deployment 
exports.keyrock = "http://" + process.env.KEYROCK + ":" + process.env.KEYSTONE_PORT
>>>>>>> 4b7e5ae4248d233b62ca3820268e185383a10779
exports.mysql  = {
  host : process.env.MYSQL_HOST,
  db : process.env.MYSQL_DB,
  user : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD
};
exports.context = "http://"+ process.env.ORION + ":1026/v2"
exports.crate = process.env.CRATEDB + ":4200"
*/