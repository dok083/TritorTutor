"use strict"

// Get the Tritor database.
var db = require('../database.js');

// Routes for /api/user
module.exports = {
    '/': {
        get: function(req, res) {
            // TODO: Get user from session ID.
            res.status(500).json({status: false, message: 'not implemented'})
        }
    },

    // GET request for a user with a certain ID.
    '/:userid': {
        get: function(req, res) {
            // Get the desired user ID as an integer.
            var userID = parseInt(req.params.userid) / 1;

            // Only allow positive user ID.
            if (!userID || userID < 1) {
                res.status(500).json({
                    status: false,
                    message: 'user ID must be positive'
                });
                
                return;
            }

            // Select the email and username for the user with the matching ID.
            db.select('tritor_users', ['email', 'username'], 'userID=' + userID,
            function(error, results, fields) {
                // If found, show the email and username. Otherwise, indicate
                // the user does not exist.
                if (results && results.length > 0) {
                    res.json(results[0]);
                } else {
                    res.status(500).json({
                        status: false,
                        message: 'user does not exist'
                    });
                }               
            }, 1);
        }
    }
}