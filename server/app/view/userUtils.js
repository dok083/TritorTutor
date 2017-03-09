"use strict"

/**
 * The view is responsible for handling the finding of users and creation
 * of new accounts
 */
 
const controller = '../controller/';

var LoginController = require(controller + 'loginController.js');
var VerificationController = require(controller + 'verificationController.js');

/**
 * Decorator for API requests that require a user. This is useful for if you
 * have a request that requires a user to be logged in. The new function has an
 * additional third parameter that is the user.
 *
 * Note: If the user is not logged in, the request function will not be called.
 *       Instead, the decorator will force a JSON response to be sent
 *       telling the user they are not logged in.
 *
 * @param The request function that should be decorated.
 * @param requiresVerified Whether or not the user must also be verified.
 * @return The decorated request function. Use for API request exports.
 */
function requiresLoggedIn(requestFunc) {
    return function(req, res) {
        // Get the session ID from the user.
        var sessionID = req.session.sessionID;

        // Indicate the user is not logged in if there is no session.
        if (!sessionID) {
            res.status(401).json({message: 'not logged in'});

            return;
        }

        // Find the user from the session ID.
        LoginController.getUser(sessionID)
            .then((user) => {
                if (user) {
                    return user;
                } else {
                    res.status(401).json({message: 'not logged in'});
                }
            })
            .then((user) => {
                VerificationController.check(user)
                    .then((verified) => {
                        user.verified = verified;
                        requestFunc(req, res, user);
                    });
            })
            .catch((error) => {
                res.status(401).json({message: error});
            });
    };
}

module.exports = requiresLoggedIn;
