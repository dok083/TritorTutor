/*
 * This file contains functions in the business layer for User Accounts
 *
 *
 */

// Databse functions
var db = require('./database.js');
var db = require('./userFormValidator.js');
var db = require('./sessionMode.js');
var db = require('./verificationModel.js');

var UserAccountModel = {};

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
UserAccountModel.getByEmail = function(email) {
	email = db.escape(email.toLowerCase());

    // Only find matching users.
    var conditions = 'email=' + email;

    // Find a user from the given e-mail.
    return db.select('tritor_users', ['userID', 'username'], conditions, 1)
        .then((results) => {
            if (results && results.length > 0) {
                return {
                    userID: results[0].userID,
                    email: email,
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
UserAccountModel.getById = function(userID) {
	 // Validate the user's ID.
    if (!isValid.ID(userID)) {
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
                    userID: userID,
                    email: results[0].email,
                    username: results[0].username
                };
            }

            return null;
        });
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
UserAccountModel.create = function(email, username, password) {
    // PLACEHOLDER CODE!!!
    // Insert values to the tritor_users table
    return db.insert('tritor_users', {
            email: email,
            username: username,
            password: password,
            salt: '' 
    }).then((results) => {
        // Send the verification e-mail after creating an account.
        VerificationModel.create(results.insertId);

        return {
        	userID: results.insertId,
        	email: email,
        	username: username
        };
    });

    // TODO: Generate a random salt.
    // TODO: Encrypt the password using hash + salt.
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
UserAccountModel.getByCredentials = function(email, password) {
	// Prepare the login information for a query.
 	email = db.escape(email.toLowerCase());
    password = db.escape(password);

    // Look for a user with a matching e-mail and password combination.
    var conditions = 'email=' + email + ' AND password=' + password;

    return db.select('tritor_users', ['userID'], conditions, 1)
        .then((results) => {
            if (results && results.length > 0) {
                return {
                	userID: results[0].userID,
                	email: email,
                	username: result[0].username
                };
            }

            return null;
        })
}

module.exports = UserAccountModel;