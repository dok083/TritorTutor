/**
 * This file contains a utility library that provides many helper functions
 * relating to users in the database.
 */
var user = {};

// Configurations for user accounts.
var userConfig = require('../../config/user.json');

// Database for creating/fetching users.
var db = require('./database.js');

/**
 * Checks whether or not the given user ID is a valid user ID in the database.
 *
 * @param userID The user ID to check.
 * @return True if it is a valid ID, false otherwise.
 */
user.isValidID = function(userID) {
    return userID > 0 && Number.isSafeInteger(userID);
}

/**
 * Checks whether or not a given e-mail address is a valid e-mail address. Note
 * that this is not completely perfect.
 *
 * @param email The e-mail address to check.
 * @return True if it is valid, false otherwise.
 */
user.isValidEmail = function(email) {
    // Regular expression for matching e-mail addresses.
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return re.test(email)
}

/**
 * Checks whether or not a username is a valid one.
 *
 * @param username The username for to check.
 * @return True if it is valid, false otherwise.
 */
user.isValidUsername = function(username) {
    return username.length >= userConfig.minUsernameLength;
}

/**
 * Checks whether or not a user's password is a valid one.
 *
 * @param password The password to check.
 * @return True if it is valid, false otherwise.
 */
user.isValidPassword = function(password) {
    return password.length >= userConfig.minPasswordLength;
}

/**
 * Finds a user from a given e-mail address. Once a user has been found, then
 * the given callback is called with the parameters being the user's ID and the
 * user's name. If a user could not be found, then the callback is called with
 * no parameters.
 *
 * @param email The email to look up.
 * @param callback A function that gets called after the lookup has results.
 */
user.findByEmail = function(email, callback) {
    // Make the e-mail safe for a query.
    email = db.escape(email.toLowerCase());

    // Find a user from the given e-mail.
    db.select('tritor_users', ['userID', 'username'], 'email=' + email,
    function(err, results) {
        if (callback && results.length > 0) {
            callback(results[0].userID, results[0].username);
        } else if (callback) {
            callback();
        }
    }, 1);
}

/**
 * Finds a user from a given user ID. Once a user has been found, then
 * the given callback is called with the parameters being the user's email and
 * the user's name. If a user could not be found, then the callback is called
 * with no parameters.
 *
 * @param userID The user ID to look up.
 * @param callback A function that gets called after the lookup has results.
 */
user.findByID = function(userID, callback) {
    if (!user.isValidID(userID)) {
        if (callback) {
            callback();
        }

        return;
    }

    // Find a user from the given e-mail.
    db.select('tritor_users', ['email', 'username'], 'userID=' + userID,
    function(err, results) {
        if (callback && results.length > 0) {
            callback(results[0].email, results[0].username);
        } else if (callback) {
            callback();
        }
    }, 1);
}

/**
 * Finds a user from a given session ID. Once the user has been found, then
 * the given callback is called with the parameters being the user's ID, the
 * user's e-mail, and the user's name. If a user could not be found, then the
 * callback is called with no parameters.
 *
 * @param token The session ID of a user.
 * @param callback A function that gets called after the lookup has results.
 */
user.findBySession = function(token, callback) {

}

/**
 * Checks whether or not a user has been verified from a given user ID. Once
 * the verified status is received, the callback is called with a boolean. The
 * boolean is true if the user is verified, false otherwise.
 *
 * @param userID The user ID to check for.
 * @param callback A function that gets called with the verification status.
 */
user.checkVerifiedByID = function(userID, callback) {

}

/**
 * Checks whether or not a user has been verified from a given user email. Once
 * the verified status is received, the callback is called with a boolean. The
 * boolean is true if the user is verified, false otherwise.
 *
 * @param userID The user email to check for.
 * @param callback A function that gets called with the verification status.
 */
user.checkVerifiedByID = function(userID, callback) {

}

/**
 * Creates a user by inserting them into the database. Once the user has been
 * created (or not), the callback is ran. If the user was created, then the
 * only parameter to the callback is an integer containing the user's ID.
 * Otherwise, there are no parameters.
 *
 * @param email The e-mail address of the user.
 * @param username The desired display name for the user.
 * @param password The desired password for the user.
 * @param callback The callback function that is ran after attempting to create
 *        the user.
 */
user.create = function(email, username, password, callback) {
    // PLACEHOLDER CODE!!!
    // Insert values to the tritor_users table
    db.insert('tritor_users', {
        email: email,
        username: username,
        password: password,
        salt: '' 
    },  function(error, results, fields) {
        if (!callback) {
            return;
        }

        if (error) {
            console.log('Unable to create user!')
            console.log(error);

            callback();
        } else {
            callback(results.insertId);
        }
    });             

    // TODO: Generate a random salt.
    // TODO: Encrypt the password using hash + salt.
    // TODO: Send verification email using user.sendVerification().
}

/**
 * Verifies the user whose verification code matches the given verification
 * code.
 *
 * @param code The verification code for a user.
 * @param callback The function to run after a user has been verified.
 */
user.verify = function(code, callback) {

}

/**
 * Creates a verification code and e-mails it to the user from the given ID.
 *
 * @param userID The user that needs a verification e-mail.
 * @param callback A function that gets called after the verification e-mail
 *        has been sent.
 */
user.sendVerification = function(userID) {
    // TODO: Look up user's e-mail.
    // TODO: Generate verification code.
    // TODO: Send verification e-mail.
}

/**
 * Creates a session for a user so a user can be identified. The callback is
 * ran with the session ID after a session has been set up.
 *
 * @param userID The ID of the user that the session is being made for.
 * @param expire When the session should expire in seconds. By default this is
 *        30 days.
 * @param callback A function that gets called after the session has been made.
 */
user.createSession = function(userID, expire, callback) {

}

/**
 * Deletes a session from a given session ID.
 *
 * @param token The ID of the session that should be removed.
 * @param callback A function that gets called after it has been removed.
 */
user.destroySession = function(token) {

}

module.exports = user;