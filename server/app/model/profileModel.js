"use strict"

/**
 * The ProfileModel allows access to storage for user profiles. User profiles
 * contain information about an account that others can see.
 */

var db = require('./database.js');

var ProfileModel = {};

/**
 * Creates a new profile for a given user.
 *
 * @param values The optional values for the profile.
 * @return A promise that is called after the profile has been created.
 */
ProfileModel.create = function(userID, values) {
    // Set the userID for the profile.
    if (!values) {
        values = {};
    }

    values.userID = userID;

    // Create the profile.
    return db.insert('tritor_profile', values);
}

/**
 * Returns profile information about a specific user.
 *
 * @param userID The ID for the desired user.
 * @param fields An option string or list of desired profile fields.
 * @return A promise containing profile information for a user.
 */
ProfileModel.get = function(userID, fields) {
    // Determine which fields to get from the database.
    if (typeof(fields) === 'string') {
        fields = [fields];
    } else if (!fields) {
        fields = ['username', 'description'];
    }

    // Get the profile from the database.
    return db.select('tritor_users', fields, 'userID=' + userID, 1)
        .then((results) => {
            var user = results[0];

            if (!user) {
                return null;
            }
            
            user.userID = userID;
            
            return user;
        });
}

/**
 * Updates profile fields for the desired user.
 *
 * @param userID The ID for the desired user.
 * @param values The updated values for the profile fields.
 * @return A promise that is called after the profile has been updated.
 */
ProfileModel.update = function(userID, values) {
    return db.update('tritor_users', values, 'userID=' + userID, 1);
}

ProfileModel.updateRating = function(userID, data){
    return db.update('tritor_users', data, 'userID=' + userID, 1);
}

/**
 * Permanently removes a profile from existence.
 *
 * @param userID The ID of the desired user.
 * @return A promise that is called after the profile has been deleted.
 */
ProfileModel.delete = function(userID) {
    return db.query('DELETE FROM tritor_profile WHERE userID = ?', [userID]);
}

module.exports = ProfileModel;
