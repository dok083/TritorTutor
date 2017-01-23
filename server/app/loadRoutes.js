/**
 * This sets up all of the API routes by loading all of the routes in the routes
 * subdirectory so files do not need to manually be required.
 */
 
"use strict"

var express = require('express');
var fs = require('fs');

// Length of the .js file extension.
const JS_EXTENSION = ('.js').length;

/**
 * Sets up all the routes from some route information to a router so
 * the requests are properly handled.
 *
 * @param routeInfo An object of route URIs and their request callbacks.
 * @param router The router to use.
 */
function bindRoute(routeInfo, router) {
    // Go through every route and set up request types for it.
    Object.keys(routeInfo).forEach(function(uri) {
        // Get which requests are needed for the URI.
        Object.keys(routeInfo[uri]).forEach(function(request) {
            router[request](uri, routeInfo[uri][request]);
        });
    });
}

/**
 * Finds all of the routes within the routes subdirectory and requires them,
 * passing in the app for the API server so they can do routing.
 *
 * @param app The application for the API server
 */
function loadRoutes(app) {
    // Find each route file in the routes subfolder.
    fs.readdir(__dirname + '/routes/', ['**.js'], function(err, routes) {
        routes.forEach(function(route) {
            // Set up middleware to handle our API routes.
            var router = express.Router();

            // Set up the router so handle the specified routes.
            var routeInfo = require("./routes/" + route);
            bindRoute(routeInfo, router);

            app.use('/' + route.substr(0, route.length - JS_EXTENSION), router);
        });
    });
}

module.exports = loadRoutes;