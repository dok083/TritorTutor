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

    return re.test(email);
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
 * @return A promise for the user being retrieved. If the user is found, then
 *         the promise is resolved with the userID and username. Otherwise,
 *         the promise is rejected with the associated error.
 */
user.findByEmail = function(email) {
    email = db.escape(email.toLowerCase());

    // Only find matching users.
    var conditions = 'email=' + email;

    // Find a user from the given e-mail.
    return db.select('tritor_users', ['userID', 'username'], conditions, 1)
        .then((results) => {
            if (results && results.length > 0) {
                return {
                    userID: results[0].userID,
                    username: results[0].username
                };
            }

            return null;
        });
}

/**
 * Finds a user from a given user ID. Once a user has been found, then
 * the given callback is called with the parameters being the user's email and
 * the user's name. If a user could not be found, then the callback is called
 * with no parameters.
 *
 * @param userID The user ID to look up.
 * @return A promise for the user being retrieved from the given ID. If the user
 *         is found, then the promise is resolved with the user's email and
 *         username. Otherwise, the promise is rejected with the associated
 *         error.
 */
user.findByID = function(userID) {
    // Validate the user's ID.
    if (!user.isValidID(userID)) {
        return new Promise(function(resolve, reject) {
            reject('invalid user ID');
        });
    }

    // Only find users with the matching ID.
    var condition = 'userID = ' + userID;

    return db.select('tritor_users', ['email', 'username'], condition, 1)
        .then((results) => {
            if (results && results.length > 0) {
                return {
                    email: results[0].email,
                    username: results[0].username
                };
            }

            return null;
        });
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
user.findBySession = function(token) {
    // Check if the sessionID token is in the database
    var condition = 'token = ' + token;

    // Query the database for the token by using db.select 
    // Modify the promise de.select returns
    return db.select('tritor_session', ['token'], condition, 1)
        .then((results) => {
            if (results) {
                return user.findByID(results[0].userID);
            }

            return null;

        });
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
 * Creates a user by inserting them into the database. Once the user has been
 * created (or not), the callback is ran. If the user was created, then the
 * only parameter to the callback is an integer containing the user's ID.
 * Otherwise, there are no parameters.
 *
 * @param email The e-mail address of the user.
 * @param username The desired display name for the user.
 * @param password The desired password for the user.
 */
user.create = function(email, username, password) {
    // PLACEHOLDER CODE!!!
    // Insert values to the tritor_users table
    return db.insert('tritor_users', {
        email: email,
        username: username,
        password: password,
        salt: '' 
    }).then((results) => {
        // Send the verification e-mail after creating an account.
        user.sendVerification(results.insertId);

        return results.insertId;
    });

    // TODO: Generate a random salt.
    // TODO: Encrypt the password using hash + salt.
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
user.sendVerification = function(userID, callback) {
    // Clear the last verification code.
    db.query('DELETE FROM tritor_verify WHERE userID = ' + userID);

    // Find the e-mail to send to.
    return db.select('tritor_users', ['email'], 'userID=' + userID, 1)
        .then((results) => {
            if (results.length == 0) {
                console.log('Cannot create verification for user ' + userID);

                return;
            }

            // Get the e-mail to send to.
            var email = results[0].email;

            // Generate a verification code.
            var crypto = require('crypto');
            var seed = email + Date.now();
            var code = crypto.createHash('sha256').update(seed).digest('hex');

            // Send the e-mail containing the verification code.
            var message = '<b>Welcome to Tritor!</b>'
                          + '<p>Verification code: ' + code + '</p>';

            require('../lib/mail.js')(email, 'Tritor Account Verification',
                                      message);

            // Store the verification code in the database.
            return db.insert('tritor_verify', {userID: userID, code: code});
        });
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
user.createSession = function(userID, expire) {
    return new Promise(function(resolve, reject) {
        resolve();
    })
}

/**
 * Deletes a session from a given session ID.
 *
 * @param token The ID of the session that should be removed.
 * @param callback A function that gets called after it has been removed.
 */
user.destroySession = function(token, callback) {

}

/**
 * Finds the ID of a user whose login credentials matches the given
 * credentials. After the ID has been found, the callback is ran with
 * the ID passed in. If the user could not be found, the callback is ran
 * with no parameters.
 *
 * @param email The e-mail address (login name) of the user.
 * @param password The password that corresponds the e-mail address.
 * @param callback A function that gets called after the search for a
 *        user finished.
 */
user.findByCredentials = function(email, password) {
    // Prepare the login information for a query.
    email = db.escape(email.toLowerCase());
    password = db.escape(password);

    // Look for a user with a matching e-mail and password combination.
    var conditions = 'email=' + email + ' AND password=' + password;
    
    return db.select('tritor_users', ['userID'], conditions, 1)
        .then((results) => {
            if (results && results.length > 0) {
                return results[0].userID;
            }

            return null;
        });
 }

module.exports = user;