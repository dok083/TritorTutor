"use strict"

/**
 * This is responsible for allowing users to log in and stay logged in.
 */

var controller = '../../controller/';

var LoginController = require(controller + 'loginController.js');
var UserFormValidator = require(controller + 'userFormValidator.js');

/**
 * Logs a user in using the given credentials and keeps them logged in using
 * a session cookie.
 */
function login(req, res) {
    // Validate user credentials.
    var email = req.body.email;
    var password = req.body.password;

    if (!UserFormValidator.checkEmail(email) ||
        !UserFormValidator.checkPassword(password)) {
        res.status(401).json({message: 'invalid email or password'});

        return;
    }

    // Try to log in with the email and password.
    LoginController.login(email, password)
        .then((sessionID) => {
            if (sessionID) {
                // Store the session ID.
                req.session.sessionID = sessionID;

                // Get the user that is now logged in.
                LoginController.getUser(sessionID)
                    .then((user) => {
                        res.json(user);
                    });
            } else {
                res.status(401).json({message: 'invalid email or password'});
            }
        })
        .catch((error) => {
            res.status(401).json({message: error});
        });
}

module.exports = {
    '/login': {post: login}
};