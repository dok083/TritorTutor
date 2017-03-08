"use strict"

/**
 * This file is responsible for handling user settings changes.
 */

var ProfileController = require('../../controller/profileController.js');
var UserFormValidator = require('../../controller/userFormValidator.js');

var escape = require('escape-html');
var requiresLoggedIn = require('../userUtils.js');
var config = require('../../../config/user.json');

var fs = require('fs');

/**
 * Called when a user wants to change a group of profile settings.
 */
function changeSettings(req, res, user) {
    var changes = req.body;
    var whitelist = {
        username: true,
        description: true,
        password: true
    };

    var hasChanges = false;

    // Make sure we do not include unwanted changes.
    for (const key of Object.keys(changes)) {
        if (!whitelist[key]) {
            res.status(400).json({message: 'invalid change for ' + key});

            return;
        }

        hasChanges = true;
    }

    // Make sure there are actually changes.
    if (!hasChanges) {
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
            console.log('this one?');
            res.status(400).json({message: error.toString()});
        });
}

// http://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file
function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    return new Buffer(matches[2], 'base64');
}

/**
 * Called when the user wants to upload a new profile picture.
 */
function uploadProfilePic(req, res, user) {
    var data = req.body.data;

    // Check if a file was actually given.
    if (!data) {
        res.status(400).json({message: 'no image given'});

        return;
    }

    // Write the data to the user's profile picture file.
    var buffer = decodeBase64Image(data);
    var file = fs.createWriteStream('../client/build/profiles/' + user.userID + '.jpg');

    file.write(buffer);
    file.end();

    res.json({message: 'success'});
}

module.exports = {
    '/': {
        post: requiresLoggedIn(changeSettings),
        put: requiresLoggedIn(uploadProfilePic)
    }
}
