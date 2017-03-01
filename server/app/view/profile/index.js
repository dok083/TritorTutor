"use strict"

var ProfileController = require('../../controller/profileController.js');

/**
 * Allows users to get information about other users' profiles.
 */

function getProfile(req, res) {
    var userID = parseInt(req.params.userID);

    if (!userID) {
        return res.status(400).json({message: 'invalid user ID'});
    } else {
        userID = Math.floor(userID);
    }

    ProfileController.get(userID)
        .then((profile) => {
            res.json(profile);
        });
}

module.exports = {
    '/:userID': {
        get: getProfile
    }
};
