"use strict"

// Get the Tritor database.
var user = require('../lib/user.js');

// Routes for /api/user
module.exports = {
    '/': {
        get: function(req, res) {
            // TODO: Get user from session ID.
            res.status(500).json({status: false, message: 'not implemented'})
        },

        // POST /api/user
        post: function(req, res) {
            // Get the desired user fields.
            var email = req.body.email;
            var username = req.body.username;
            var password = req.body.password;

            // Check for validity of the username.
            if (!user.isValidUsername(username)) {
                res.status(422).json({message: "username is invalid"});

                return;
            }

            // Check for validity of the e-mail address.
            if (!user.isValidEmail(email)) {
                res.status(422).json({message: "email is invalid"});

                return;
            }

            // Check for validity of the password.
            if (!user.isValidPassword(password)) {
                res.status(422).json({message: "password is invalid"});

                return;
            }

            // Check if a user already exists with this e-mail.
            user.findByEmail(email)
                .then((otherUser) => {
                    // If so, then do not create a new user.
                    if (otherUser) {
                        res.status(409).json({message: "email already in use"});

                        return;
                    }

                    // Otherwise, create the user.
                    user.create(email, username, password)
                        .then((newUserID) => {
                            res.json({id: newUserID});
                        }, (error) => {
                            res.json({message: error});
                        });
                });
        }
    },

    // GET request for a user with a certain ID.
    // FOR DEVELOPMENT USE ONLY!
    '/:userid': {
        get: function(req, res) {
            // Get the desired user ID as an integer.
            var userID = parseInt(req.params.userid) / 1;

            // Only allow positive user ID.
            if (!user.isValidID(userID)) {
                res.status(500).json({
                    status: false,
                    message: 'user ID must be positive'
                });
                
                return;
            }

            // Select the email and username for the user with the matching ID.
            user.findByID(userID)
                .then((user) => {
                    if (user) {
                        res.json(user);
                    } else {
                        res.status(500).json({
                            status: false,
                            message: 'user does not exist'
                        });
                    }
                });
        }
    },

    '/login': {
        // Logs in to an existing account
        post: function(req, res) {
            var inputEmail = req.body.email;
            var inputPass = req.body.password;

            // Check if user input is valid.
            if (!user.isValidEmail(inputEmail) ||
                !user.isValidPassword(inputPass)) {
                res.status(401).json({
                    message: 'invalid email or password'
                });

                return;
            }

            // TODO: Hash and salt password. Yiming plox

            // Check if a user with this email and password combination exists.
            user.findByCredentials(inputEmail, inputPass)
                .then((userID) => {
                    if (userID) {
                        // If so, create a session to sign in with.
                        user.createSession(userID, 0)
                            .then((sessionID) => {
                                if (sessionID) {
                                    res.json({sessionID: sessionID});
                                } else {
                                    res.status(500).json({
                                        message: 'failed to create session'
                                    });
                                }
                            });
                    } else {
                        res.status(401).json({
                            message: 'invalid email or password'
                        });
                    }
                })
        }
    }
}
