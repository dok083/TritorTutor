"use strict"

/**
 * This file is responsible for handling user settings changes.
 */

var ProfileController = require('../../controller/profileController.js');
var UserFormValidator = require('../../controller/userFormValidator.js');

var escape = require('escape-html');
var requiresLoggedIn = require('../userUtils.js');
var config = require('../../../config/user.json');

/**
 * Called when a user wants to change a group of profile settings.
 */
function changeProfileSettings(req, res, user) {
    var changes = req.body;

    // Make sure there are actually changes.
    if (Object.keys(changes) == 0) {
        res.json({message: 'okay'});

        return;
    }

    // Check for valid username.
    if (changes.username && !UserFormValidator.checkUsername(changes.username)) {
        res.status(400).json({message: 'invalid username'});

        return;
    }

    ProfileController.update(user.userID, changes)
        .then(() => {
            res.json({message: 'done'});
        })
        .catch((error) => {
            res.status(400).json({message: error.toString()});
        });
}

module.exports = {
    '/profile': {post: requiresLoggedIn(changeProfileSettings)}
}
