"use strict"

/**
 * This controller handles the starting and finishing of a password reset
 * process for a user.
 */

// http://stackoverflow.com/questions/18405736/is-there-a-c-sharp-string-format-equivalent-in-javascript
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

var ResetPasswordModel = require('../model/resetPasswordModel.js');
var EmailModel = require('../model/emailModel.js');
var config = require('../../config/user.json');

var ResetPasswordController = {};

/**
 * Generates a new code for a password reset.
 *
 * @return A randomly generated password reset code.
 */
ResetPasswordController.generate = function() {
    var crypto = require('crypto');

    return crypto.randomBytes(32).toString('hex');
}

/**
 * Adds a new password reset code for the given user.
 *
 * @param userID The ID of the desired user.
 * @return A promise that is called after the reset code has been made.
 */
ResetPasswordController.start = function(user) {
    // Get when the code should expire.
    var expire = new Date();
    expire.setMinutes(expire.getMinutes() + config.resetExpireMins);

    // Get the actual code.
    var code = ResetPasswordController.generate();
    var codeURL = 'http://138.197.211.222/reset-password/' + code;

    // Create a new reset code for the given user.
    console.log(user);
    return ResetPasswordModel.create(user.userID, code, expire)
        .then(() => {
            var message = config.resetEmail.format(codeURL);
            console.log(user.email);
            // Email the user the reset link.
            EmailModel.send(user.email, 'Tritor Password Reset',
                                   message);
        })
}

/**
 * Gets the user that a password reset code belongs to and removes it. This
 * will also check if the code has not expired yet.
 *
 * @param code The desired password reset code.
 * @return A promise that contains a user ID if the code was valid.
 */
ResetPasswordController.finish = function(code) {
    return ResetPasswordModel.get(code)
        .then((reset) => {
            if (!reset) {
                return Promise.reject('This reset link is not valid or has expired.');
            }

            // Make sure the code has not expired.
            if ((new Date()).getTime() > reset.expire.getTime()) {
                ResetPasswordModel.delete(code);

                return Promise.reject('This reset link has expired.');
            }

            // Delete the code so it may not be used again.
            ResetPasswordModel.delete(code);

            return reset.userID;
        });
}

module.exports = ResetPasswordController
