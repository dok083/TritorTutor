// Get configuration for database connection.
var config = require('../config/database.json');
var mysql = require('mysql');
var realConnection = mysql.createConnection(config);
var connection;

realConnection.connect(function(err) {
    if (err) {
        console.log('Could not connect to Tritor database!');
        console.log(err);

        return;
    }

    console.log('Connected to Tritor database!');
    connection = realConnection;
})

module.exports = function() { return connection; };