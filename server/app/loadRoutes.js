/**
 * This sets up all of the API routes by loading all of the routes in the routes
 * subdirectory so files do not need to manually be required.
 */
 
"use strict"

var express = require('express');
var fs = require('fs');
var path = require('path');

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
    var routePath = path.join(__dirname, 'view');
    
    // Visit each folder in the view directory.
    fs.readdirSync(routePath).forEach((file) => {
        var folderPath = routePath + '/' + file;

        // Don't visit files.
        if (fs.statSync(folderPath).isFile()) {
            return;
        } 

        // Create a route for this subdirectory.
        var router = express.Router();
        
        // Load all the routes into the router.
        fs.readdirSync(folderPath).forEach((routeFile) => {
            if (path.extname(routeFile) !== '.js') {
                return;
            }    

            // Set up a new route from the file.
            var routeInfo = require(folderPath + '/' + routeFile);
            bindRoute(routeInfo, router);
 
        });

        // Add the route to the application.
        app.use('/' + file, router);
    });
}

module.exports = loadRoutes;