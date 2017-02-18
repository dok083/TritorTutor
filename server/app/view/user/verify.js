"use strict"

/**
 * This is responsible for allowing users to verify their account with a
 * verification code.
 */

var controller = '../../controller/';
var VerificationController = require(controller + 'verificationController.js');

/**
 * Verifies an account from a given verification code.
 */
function verify(req, res) {
    var code = req.params.code;

    // Check if there is a code to verify with.
    if (code) {
        // Try using the given verification code.
        VerificationController.verify(code)
            .then((verified) => {
                // Check whether or not the user was verified.
                if (verified) {
                    res.json({
                        status: true,
                        message: 'verified'
                    })
                } else {
                    res.status(404).json({
                        status: false,
                        message: 'code not found or expired'
                    });
                }
            })
    } else {
        res.status(404).json({
            status: false,
            message: 'code not found or expired'
        });
    }
}

module.exports = {
    '/': {patch: verify}
};