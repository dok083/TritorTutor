/*
 * This model handels a newly registered user. It allocates space for the newly
 * registered user in the database. Once the user presses the
 * link on the email, the user
 */

"use strict"

var verificationModel = {};

// Database for creating/fetching users.
var db = require('./database.js');

/*
 * Creates a verification code and e-mails it to the user from the given ID.
 *
 * @param userID: The user that needs a verification e-mail
 */
verificationModel.create = function(userID) {
	// Clear the last verification code of this user
	db.query('DELETE FROM trtor_verify WHERE userID = ' + userID, 1);

	return db.select('tritor_users', ['email'], 'userID' + userID, 1)
		.then((results) => {
			if (results.length == 0) {
				console.log('Cannot create verification for' +
				'user' + userID);
				
				return;
			} // End of if statement
		
		// Store the verification code in the database
		db.insert('tritor_verify', {userID: userID, code: code});
		}); // End of db.select()
}

/*
 * Checks whether or not a user has been verified from a given user ID. Once
 * the verified status is received, the promise will return a boolean. The
 * boolean is true if the user is verified, false otherwise.
 * @param userID: The user ID to check for.
 */
verificationModel.get = function(userID) {
	reutrn db.select('tritor_verify', ['userID'], 'userID' + userID, 1)
		.then((results) => {
			if (results && results.length > 0) {
				return false;
			}
			else {
				return true;
			}
		});
}

/*
 * Verifies the user whose verification code matches the given verification
 * code.
 *
 * @param code: The verification code for a user
 */
verificationModel.delete = function(code) {
	// Create the delete query
	var queryStr = 'DELETE FROM tritor_verify WHERE code = ? LIMIT 1';
	
	// Delete a user from the unverified-user table
	return db.query(queryStr, code);
}

module.exports = verificationModel;
