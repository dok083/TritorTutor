"use strict"

var ResetPasswordModel = {}

var db = require('./database.js');

/**
 * Creates a new password reset code and stores it in the database.
 *
 * @param userID The ID of the user that the password is being reset for.
 * @param code The code that will be used to reset the password.
 * @param A date for when the code will expire.
 * @return A promise that runs after the code has been added to the database.
 */
ResetPasswordModel.create = function(userID, code, expire) {
    // Clear the last reset code of this user.
    return db.query('INSERT INTO tritor_reset (userID, code, expire) VALUES ' + 
                    ' (?, ?, ?) ON DUPLICATE KEY UPDATE code=?, expire=?',
                    [userID, code, expire, code, expire]);
}

/**
 * Returns information about a password reset code corresponding to the given
 * code.
 *
 * @param code The desired password reset code.
 * @return A promise that contains information about the reset code.
 */
ResetPasswordModel.get = function(code) {
    var condition = 'code=' + db.escape(code);

    return db.select('tritor_reset', ['userID', 'expire'], condition, 1)
        .then((results) => {
            return results[0];
        });
}

/**
 * Deletes a verification code so it can no longer be used.
 *
 * @param code The desired code.
 * @return A promise that is called after the code has been deleted.
 */
ResetPasswordModel.delete = function(code) {
    return db.query('DELETE FROM tritor_reset WHERE code = ? LIMIT 1', [code]);
}

module.exports = ResetPasswordModel