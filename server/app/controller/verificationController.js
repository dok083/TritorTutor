"use strict"

/**
 * The VerificationController is responsible for the creation of verification
 * codes, sending of verification codes, and verification of users.
 */

var VerificationModel = require('../model/verificationModel.js');
var EmailModel = require('../model/emailModel.js');

var VerificationController = {}

/**
 * Verifies a user from a given verification code.
 *
 * @param code The verification code for a user.
 * @return A promise that is called after the verification is done.
 */
VerificationController.verify = function(code) {
    // Remove the verification code.
    return VerificationModel.delete(code);
}

/**
 * Generates a verification code. This verification code should be a random
 * string and unique for a user.
 *
 * @return A verification code.
 */
VerificationController.generate = function() {
    var crypto = require('crypto');

    return crypto.randomBytes(32).toString('hex');
}

/**
 * Stores the given verification code so a user can be verified later and
 * sends a verification email to the given email containing the given
 * verification code.
 *
 * @param email The email address of the user.
 * @param code The verification code that should be sent.
 * @return A promise that is called after the code has been sent.
 */
VerificationController.send = function(email, code) {
    var message = '<h1>Welcome to Tritor!</h1>' +
                   '<p>Here is your verification code: ' + code + '</p>';

    return EmailModel.send(email, 'Tritor Account Verification', message);
}

/**
 * Begins the verification process for a user by generating a code and sending
 * the code to the given user's email.
 *
 * @param user An unverified user that should be verified.
 * @return A promise that is called after the verification code has been sent.
 */
VerificationController.begin = function(user) {
    // Generate and store the code.
    var code = VerificationController.generate();
    VerificationModel.create(user.userID, code);

    // Notify the user of the code.
    return VerificationController.send(user.email, code);
}

module.exports = VerificationController;