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

/*
 *
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

/*
 *
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
        	userID: result[0].userID,
        	email: email,
        	username: username
        };
    });

    // TODO: Generate a random salt.
    // TODO: Encrypt the password using hash + salt.
}

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