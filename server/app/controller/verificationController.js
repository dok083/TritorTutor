"use strict"

/**
 * The VerificationController is responsible for the creation of verification
 * codes, sending of verification codes, and verification of users.
 */

var VerificationController = {}

/**
 * Verifies a user from a given verification code.
 *
 * @param code The verification code for a user.
 * @return A promise that is called after the verification is done.
 */
VerificationController.verify = function(code) {

}

/**
 * Generates a verification code. This verification code should be a random
 * string and unique for a user.
 *
 * @return A verification code.
 */
VerificationController.generate = function() {

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

}

module.exports = VerificationController;