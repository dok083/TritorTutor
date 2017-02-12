/* This file contains validity checks for the business layer
 *
 */
 
"use strict"

var UserFormValidator = {};
// Configurations for user accounts
var userConfig = require('../../config/user.json');

/**
 * Checks whether or not the given user ID is a valid user ID in the database.
 *
 * @param userID The user ID to check.
 * @return True if it is a valid ID, false otherwise.
 */
UserFormValidator.ID = function(userID) {
    userID = parseInt(userID);

    return userID && userID > 0 && Number.isSafeInteger(userID);
}

/**
 * Checks whether or not a given e-mail address is a valid e-mail address. Note
 * that this is not completely perfect.
 *
 * @param email The e-mail address to check.
 * @return True if it is valid, false otherwise.
 */
UserFormValidator.email = function(email) {
    // Regular expression for matching e-mail addresses.
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        return re.test(email);
}

/**
 * Checks whether or not a username is a valid one.
 *
 * @param username The username for to check.
 * @return True if it is valid, false otherwise.
 */
UserFormValidator.username = function(username) {
    return username.length >= userConfig.minUsernameLength;
}

/**
 * Checks whether or not a user's password is a valid one.
 *
 * @param password The password to check.
 * @return True if it is valid, false otherwise.
 */
UserFormValidator.password = function(password) {
    return password.length >= userConfig.minPasswordLength;
}

module.exports = UserFormValidator;
