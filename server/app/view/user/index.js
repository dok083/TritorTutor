"use strict"

/**
 * The view is responsible for handling the finding of users and creation
 * of new accounts
 */
 
var controller = '../../controller/';

var LoginController = require(controller + 'loginController.js');
var AccountController = require(controller + 'accountController.js');
var VerificationController = require(controller + 'verificationController.js');
var UserFormValidator = require('./userFormValidator.js');

/**
 * Retrieves the user that is currently logged in.
 */
function getUser(req, res) {
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
                res.json(user);
            } else {
                res.status(401).json({message: 'not logged in'});
            }
        })
}

/**
 * Creates a new account for a user.
 */
function createUser(req, res) {
    // Get the desired user fields.
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    // Check for validity of the username.
    if (!UserFormValidator.checkUsername(username)) {
        res.status(422).json({message: "username is invalid"});

        return;
    }

    // Check for validity of the e-mail address.
    if (!UserFormValidator.checkEmail(email)) {
        res.status(422).json({message: "email is invalid"});

        return;
    }

    // Check for validity of the password.
    if (!UserFormValidator.checkPassword(password)) {
        res.status(422).json({message: "password is invalid"});

        return;
    }

    // Create an account using the given credentials.
    AccountController.create(email, username, password)
        .then((user) => {
            // Set up the verification code for the user.
            VerificationController.begin(user);

            res.json({id: user.id});
        })
        .catch((error) => {
            res.status(500).json({message: error});
        });
}

module.exports = {
    '/': {
        get: getUser,
        post: createUser
    }
};