"use strict"

/**
 * The ProfileController class handles the logic for updating user profiles.
 */

var ProfileModel = require('../model/profileModel.js');
var AccountModel = require('../model/accountModel.js');

var ProfileController = {}

/**
 * Returns profile information about a specific user.
 *
 * @param userID The ID for the desired user.
 * @param fields An option string or list of desired profile fields.
 * @return A promise containing profile information for a user.
 */
ProfileController.get = function(userID) {
    return ProfileModel.get(userID);
}

/**
 * Updates profile fields for the desired user.
 *
 * @param userID The ID for the desired user.
 * @param values The updated values for the profile fields.
 * @return A promise that is called after the profile has been updated.
 */
ProfileController.update = function(userID, values) {
    // The new values for the profile.
    var newValues = {};

    // Set newValues to be the cleaned up given values.
    if (values.username) {
        newValues.username = values.username;
    }

    if (values.description) {
        newValues.description = values.description;
    }

    if (values.avgRating) {
        newValues.avgRating = parseFloat(values.avgRating);

        if (newValues.avgRating > 5) {
            newValues.avgRating = 5;
        } else if (newValues.avgRating < 0) {
            newValues.avgRating = 0;
        }
    }

    var promise = new Promise(function(resolve, reject) {
        // Hash password if we need to change it.
        if (values.password) {
            AccountModel.getHashedPassword(values.password)
                .then((hashedPassword) => {
                    newValues.password = hashedPassword;
                    resolve();
                });

            return;
        }

        resolve();
    });

    // Update the profile.
    return promise.then(() => {
        return ProfileModel.update(userID, newValues);
    });
}

/**
 * Permanently removes a profile from existence.
 *
 * @param userID The ID of the desired user.
 * @return A promise that is called after the profile has been deleted.
 */
ProfileController.delete = function(userID) {
    return ProfileModel.delete(userID);
}

/**
 * Creates a new profile for a given user.
 *
 * @param values The optional values for the profile.
 * @return A promise that is called after the profile has been created.
 */
ProfileController.create = function(userID, values) {
    return ProfileModel.create(userID, values);
}

module.exports = ProfileController;
