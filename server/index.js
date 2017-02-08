/**
 * This is the main part of the REST API server for Tritors. This is mainly
 * for loading all of the components needed to make the API function.
 */

"use strict"

// Load configuration for the API server.
var serverConfig = require('./config/server.json');

// Set up the API server.
var express = require('express');
var app = express();

// Set up use of sessions.
var cookieSession = require('cookie-session');

app.use(cookieSession({
    name: 'tritor-session',
    secret: 'ZeCahU4cn7jaHKHG3cJwBBUz',
    maxAge: 1000 * 60 * 60 * 24 * 30
}));

// Set up JSON parsing on the server.
var bodyParser = require('body-parser');

app.use(bodyParser.json({type: '*/*'}));
app.use(bodyParser.urlencoded({extended: true}));

// Load all of the routes.
require('./app/loadRoutes.js')(app);

// Listen on the desired port.
app.listen(serverConfig.port);

console.log("Tritor API server started on port " + serverConfig.port);
