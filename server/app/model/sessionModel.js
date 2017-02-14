"use strict"

/**
 * This file provides functions for accessing the sessions in the database. This
 * allows one to create, delete, and get sessions.
 */

// Constants for time.
var SECOND = 1000
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
var MONTH = 30 * DAY;

var SessionModel = {};

// Database for creating/fetching users.
var db = require('./database.js');

/**
 * Finds the user ID that corresponds to a session ID.
 *
 * @param token The session ID of a user.
 * @return A promise that passes in the ID of the user who owns the session.
 */
SessionModel.get = function(token) {
    // User's token must match the stored token.
    var condition = 'token = ' + db.escape(token);

    // Get the user from the matching session ID.
    return db.select('tritor_sessions', ['userID'], condition, 1)
        .then((results) => {
            if (results) {
                return results[0].userID;
            }

            return null;
        })
        .catch((error) => {
            return null;
        });
}

/**
 * Deletes a session from a given session ID.
 *
 * @param token The ID of the session that should be removed.
 * @param callback A function that gets called after it has been removed.
 */
SessionModel.delete = function(token) {
    return db.query('DELETE FROM tritor_sessions WHERE token = ?',
                    [token.toString()]);
}

/**
 * Creates a session for a user so a user can be identified. The callback is
 * ran with the session ID after a session has been set up.
 *
 * @param userID The ID of the user that the session is being made for.
 * @param expire When the session should expire in seconds. By default this is
 *        30 days.
 * @return A promise containing the ID of a newly generated session for a user.
 */
SessionModel.create = function(userID, expire) {
    // Generate a verification code.
    var crypto = require('crypto');
    var curTime = Date.now();
    var seed = (userID + curTime).toString();
    var token = crypto.createHash('sha256').update(seed).digest('hex');

    // Default the expiration date to a month from now.
    if (!expire) {
        expire = curTime + MONTH;
    }

    return db.insert('tritor_sessions', {
        token: token,
        userID: userID,
        expiration: new Date(expire)
    }).then((results) => {
        return token;
    });
}

module.exports = SessionModel;