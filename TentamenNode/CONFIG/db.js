var mysql = require('mysql');
var config = require('../CONFIG/config.json');

var pool2 = mysql.createPool({
    multipleStatements:true,
    connectionLimit : 25,
    host : config.dbHost,
    user : config.dbUsername,
    password : config.dbPassword,
    database : config.dbDatabaseUser

});

module.exports = pool2;