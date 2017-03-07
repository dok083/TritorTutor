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

TutorController.update = function(course, userID, avgRating, desc, price, nego) {
	// TODO:data
	return db.update(course, userID, data);
}

module.exports = TutorController;
