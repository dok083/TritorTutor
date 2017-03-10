"use strict"

/**
 * The TutorController class is responsible for creating and deleting tutor 
 * listings.
 */

var TutorModel = require('../model/tutorModel.js');

var TutorController = {};

/**
 * Get a list of tutor listings for a certain course. 
 *
 * @param course The id of the course to find listings for.
 * @return A promise containing a list of objects that has tutorID, 
 *         description, price, and negotiable.
 */
TutorController.get = function(course) {
	return TutorModel.get(course);
}

/**
 * Returns the tutoring information for a given tutor for a given course.
 *
 * @param userID The ID of the desired tutor.
 * @param courseID The ID of the course the user is tutoring for.
 * @return A promise that contains object with tutoring information. This may be
 *         null if the user is not tutoring for the course.
 */
TutorController.getByUser = function(userID, courseID) {
    return TutorModel.getByUser(userID, courseID);
}

/**
 * Add a tutor listing.
 *
 * @param course The course this listing is for.
 * @param userID The user that is tutoring for this listing.
 * @param desc A description of the service the user offers.
 * @param price The price asked for the service.
 * @param nego Willingness to change price.
 * @return A promise that contains nothing.
 */
TutorController.add = function(course, userID, desc, price, nego) {
	return TutorModel.create(course, userID, desc, price, nego);
}

/**
 * Remove a tutor listing.
 * 
 * @param course The course this listing is for.
 * @param userID The user that is tutoring for this listing.
 */
TutorController.remove = function(course, userID) {
	return TutorModel.delete(course, userID);
}

TutorController.update = function(course, userID, data) {
    // Get a clean value for the desired changes.
    var changes = {};

    if (data.avgRating) {
        changes.avgRating = Math.min(Math.max(parseFloat(data.avgRating), 0.0), 5.0);
    }

    if (data.desc) {
        changes.desc = data.desc.substr(0, 500);
    }

    if (data.price) {
        changes.price = Math.max(Math.ceil(data.price), 0);
    }

    if (data.negotiable != undefined) {
        changes.negotiable = data.negotiable ? true : false;
    }

	return TutorModel.update(course, userID, data);
}

/**
 * Returns the top tutors on Tritor.
 * 
 * @return A promise containing a list of popular tutors.
 */
TutorController.getPopular = function() {
    return TutorModel.getPopular();
}

module.exports = TutorController;
