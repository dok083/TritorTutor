/**
 * This is the main part of the REST API server for Tritors. This is mainly
 * for loading all of the components needed to make the API function.
 */

"use strict"

// Load configuration for the API server.
var serverConfig = require('./config/server.js');

// Set up the API server.
var express = require('express');
var app = express();

// Set up JSON parsing on the server.
var bodyParser = require('body-parser');

app.use(bodyParser.json({type: '*/*'}));
app.use(bodyParser.urlencoded({extended: true}));

// Load all of the routes.
require('./app/loadRoutes.js')(app);

// Listen on the desired port.
app.listen(serverConfig.port);