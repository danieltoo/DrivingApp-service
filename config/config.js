
/*exports.keyrock = "http://viva-smartsdk.duckdns.org:8001"
exports.mysql = {
  host : '200.23.5.142',
  db : 'smartsdksecurity',
  user : 'cenidet',
  password : 'Cenidet2017'
}
exports.context = 'http://200.23.5.142:1026/v2';
exports.crate = 'http://200.23.5.142:4200';*/

exports.keyrock = "http://" + process.env.KEYROCK + ":" + process.env.KEYSTONE_PORT
exports.mysql  = {
  host : process.env.MYSQL_HOST,
  db : process.env.MYSQL_DB,
  user : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD
};
exports.context = "http://"+ process.env.ORION + ":1026/v2"
exports.crate = process.env.CRATEDB + ":4200"
