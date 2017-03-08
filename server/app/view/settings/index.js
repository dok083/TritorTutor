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
function changeProfileSettings(req, res, user) {
    var changes = req.body;
    console.log(changes);

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
    '/profile': {
        post: requiresLoggedIn(changeProfileSettings),
        put: requiresLoggedIn(uploadProfilePic)
    },
}
