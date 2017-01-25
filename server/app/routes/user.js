"use strict"

var db = require('../database.js');

module.exports = {
    '/': {
        get: function(req, res) {
            // TODO: Get user from session ID.
            res.json({status: false, message: 'not implemented'})
        }
    },
    '/:userid': {
        get: function(req, res) {
            var userID = parseInt(req.params.userid);

            if (!userID || userID < 0) {
                res.json({status: false, message: 'invalid user ID'});
                
                return;
            }

            // Select the database for a user that matches the given ID.
            db().query('SELECT email, username FROM tritor_users WHERE userID = ? LIMIT 1',
            [req.params.userid],
            function(error, results, fields) {
                if (results && results.length > 0) {
                    res.json(results[0]);
                }
            });
        }
    }
}