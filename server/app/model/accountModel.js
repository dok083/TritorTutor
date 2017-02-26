"use strict"

/**
 * This file contains the AccountModel which is responsible for access
 * to users in the database. This allows for the searching and creating of
 * users on the database.
 */

var db = require('./database.js');

var AccountModel = {};

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
AccountModel.getByEmail = function(email) {
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
AccountModel.getByID = function(userID) {
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
 * Creates a user by inserting them into the database.
 *
 * @param email The e-mail address of the user.
 * @param username The desired display name for the user.
 * @param password The desired password for the user.
 * @return A promise that contains the user after inserting is done.
 */
AccountModel.create = function(email, username, password) {
    // TODO: Generate a random salt.
    // TODO: Encrypt the password using hash + salt.

    // Insert values to the tritor_users table
    return db.insert('tritor_users', {
            email: email,
            username: username,
            password: password,
            salt: '' 
    }).then((results) => {
        return {
        	userID: results.insertId,
        	email: email,
        	username: username
        };
    });
}

/**
 * Finds the ID of a user whose login credentials matches the given
 * credentials.
 *
 * @param email The e-mail address (login name) of the user.
 * @param password The password that corresponds the e-mail address.
 * @return A promise containing the user if found, otherwise the user is null.
 */
AccountModel.getByCredentials = function(email, password) {
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
                	username: results[0].username
                };
            }

            return null;
        })
}

/**
 * Deletes a user from the given user ID. Note that this is permanent.
 *
 * @param userID The ID for the user that should be deleted.
 * @return A promise that runs after the user has been deleted.
 */
AccountModel.delete = function(userID) {
    db.query('DELETE FROM tritor_users WHERE userID = ? LIMIT 1', [userID]);
}

module.exports = AccountModel;