"use strict"

/**
 * This is responsible for allowing users to log out.
 */

var LoginController = require('../../controller/loginController.js');

/**
 * Logs a user out by removing the session cookie.
 */
function logout(req, res) {
    var sessionID = req.session.sessionID;

    // Delete the login session.
    if (sessionID) {
        LoginController.logout(sessionID);
    }

    // Empty the cookie for the session.
    res.session = null;
    res.status(200).json({message: 'bye'});
}

module.exports = {
    '/logout': {get: logout}
};