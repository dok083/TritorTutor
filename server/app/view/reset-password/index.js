"use strict"

/**
 * This file handles requests for resetting passwords.
 */

const controller = '../../controller/';

var ResetPasswordController = require(controller + 'resetPasswordController.js');
var AccountController = require(controller + 'accountController.js');
var ProfileController = require(controller + 'profileController.js');
var UserFormValidator = require(controller + 'userFormValidator.js');

/**
 * Handles requests for account reset. This expects an email that is associated
 * with an existing account. An email will be sent to the given address if
 * there is an account associated.
 */
function resetPasswordRequest(req, res) {
    // Check for valid email input.
    if (!req.body.email) {
        res.status(400).json({message: 'You have provided an invalid email.'});

        return;
    }

    if (!UserFormValidator.checkEmail(req.body.email)) {
        res.status(400).json({message: 'You have provided an invalid email.'});

        return;
    }

    // See if there is an associated account.
    AccountController.getByEmail(req.body.email)
        .then((user) => {
            if (user) {
                return ResetPasswordController.start(user)
                    .then(() => {
                        res.json({message: 'success'});
                    });
            } else {
                res.status(400).json({message: 'You have provided an invalid email.'});
            }
        })
        .catch((error) => {
            res.status(400).json({message: error.toString()});
        });
}

/**
 * This takes in a reset code and a desired password for resetting a specific
 * user's account.
 */
function resetPassword(req, res) {
    // Check that we have a reset code and new password.
    if (!req.params.code) {
        res.status(400).json({message: 'invalid code'});

        return;
    }

    if (!req.body.password) {
        res.status(400).json({message: 'invalid password'});

        return;
    }

    // Get which user this code belongs to.
    ResetPasswordController.finish(req.params.code)
        .then((userID) => {
            return ProfileController.update(userID, {
                password: req.body.password.toString()
            });
        })
        .then(() => {
            res.json({message: 'success'});
        })
        .catch((error) => {
            res.status(400).json({message: error.toString()});
        });
}

module.exports = {
    '/:code': {post: resetPassword},
    '/': {post: resetPasswordRequest}
}