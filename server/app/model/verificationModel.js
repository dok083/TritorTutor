"use strict"

/*
 * This model handels a newly registered user. It allocates space for the newly
 * registered user in the database. Once the user presses the
 * link on the email, the user
 */

var VerificationModel = {};

// Database for creating/fetching users.
var db = require('./database.js');

/*
 * Stores the verification code for the desired user within the database. If a
 * verification code for the desired user already exists, then it will be
 * replaced, so the old code will no longer work.
 *
 * @param userID The user that needs a verification e-mail
 * @param code The verification code for the user
 */
VerificationModel.create = function(userID, code) {
    // Clear the last verification code of this user.
    db.query('INSERT INTO tritor_verify (userID, code) VALUES (?, ?)' +
             'ON DUPLICATE KEY UPDATE code=VALUES(?)', [userID, code, code]);
}

/*
 * Checks whether or not a user has been verified from a given user ID. Once
 * the verified status is received, the promise will return a boolean. The
 * boolean is true if the user is verified, false otherwise.
 *
 * @param userID The user ID to check for.
 * @return A promise that contains true if the user is verified,
 *         false otherwise.
 */
VerificationModel.get = function(userID) {
    return db.select('tritor_verify', ['userID'], 'userID=' + userID, 1)
    .then((results) => {
        if (results && results.length > 0) {
            return false;
        } else {
            return true;
        }
    });
}

/*
 * Verifies the user whose verification code matches the given verification
 * code.
 *
 * @param code The verification code for a user.
 * @return A promise for after the verification is done.
 */
VerificationModel.delete = function(code) {
    return db.query('DELETE FROM tritor_verify WHERE code = ? LIMIT 1', [code]);
}

module.exports = VerificationModel;