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
            user.findByEmail(email, function(otherUserID) {
                // If so, then do not create a new user.
                if (otherUserID) {
                    res.status(409).json({message: "email already in use"});

                    return;
                }

                // Otherwise, create the user.
                user.create(email, username, password, function(newUserID) {
                    if (newUserID) {
                        res.json({id: newUserID});

                        return;
                    }
                    
                    res.status(500).json({message: "unable to create user"});
                })
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
            user.findByID(userID, function(email, username) {
                if (email) {
                    res.json({email: email, username: username});
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


            // Check if user input is valid
            if (!user.isValidEmail(inputEmail) || !user.isValidPassword(inputPass)) {
                res.status(404).json({
                    message: 'invalid email or password'
                });

                return;
            }

            // TODO: Hash and salt password. Yiming plox

            // Check if a user with this email and password combination exists in the database
            user.findByCredentials(inputEmail, inputPass function(userID){
                if (!userID) {
                    res.status(404).json({
                        message: 'invalid email or password'
                    });
                } else {
                    // Create session id
                    user.createSession(userID, , function(sessionID) {
                        res.json({sessionID: sessionID});

                    });
                }

            }); 

        }
    }
}