"use strict"

/**
 * The LoginController is responsible for handling logging users in, logging
 * users out, and determining which user is logged in.
 */

var LoginController = {}

/**
 * Generates a session ID so a user can be logged in using the given username
 * and password.
 *
 * @param username The username for the desired user.
 * @param password The corresponding password for the username.
 * @return A promise that holds the session ID if the user is now logged in.
 *         If the credentials did not match a user, then the promise holds null.
 */
LoginController.login = function(username, password) {

}

/**
 * Removes a session from the given session ID so the corresponding user is
 * no longer logged in.
 *
 * @param sessionID The session ID for the user.
 * @return A promise that is called after the user is logged out.
 */
LoginController.logout = function(sessionID) {

}

/**
 * Find a user (email, username, and user ID) from a given session ID.
 *
 * @param sessionID The session ID that corresponds to a user.
 * @return A promise that holds the user if the user was found, otherwise null.
 */
LoginController.getUser = function(sessionID) {

}

module.exports = LoginController;