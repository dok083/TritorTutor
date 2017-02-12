// Constants for times in seconds.
var SECOND = 1000
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
var MONTH = 30 * DAY;

var sessionModel = {};

// Configurations for user accounts.

// Database for creating/fetching users.
var db = require('./database.js');
var db = require('./userAccountModel');
var db = require('./verificationModel');
var db = require('./userFormValidator');

/**
 * Finds a user from a given session ID. Once the user has been found, then
 * the given callback is called with the parameters being the user's ID, the
 * user's e-mail, and the user's name. If a user could not be found, then the
 * callback is called with no parameters.
 *
 * @param token The session ID of a user.
 * @param callback A function that gets called after the lookup has results.
 */
sessionModel.get = function(token) {
    // User's token must match the stored token.
    var condition = 'token = ' + db.escape(token);

    // Get the user from the matching session ID.
    return db.select('tritor_sessions', ['userID'], condition, 1)
        .then((results) => {
            if (results) {
                return sessionModel.get(results[0].userID);
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
sessionModel.delete = function(token) {
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
sessionModel.create = function(userID, expire) {
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

module.exports = sessionModel;