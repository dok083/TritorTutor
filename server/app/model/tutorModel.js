"use strict"

/**
 * This file containes the TutorModel which is responsible for access to 
 * tutors on the database.
 */

var db = require('./database.js');

var TutorModel = {};
/**
 * Creates a tutor listing by inserting it into the database.
 *
 * @param course The course this listing is for.
 * @param userID The user that is tutoring for this listing.
 * @param desc A description of the service the user offers.
 * @param price The price asked for the service.
 * @param nego Willingness to change price.
 * @return A promise that contains nothing. 
 */
TutorModel.create = function(course, userID, desc, price, nego) {
	// Create new listing by inserting to the table in the database.
	return db.insert('tritor_tutorlist', {
		classID: course,
		tutorID: userID,
		description: desc,
		avgRating: -1,
		price: price,
		negotiable:	nego,
	});
}

/**
 * Deletes a tutor listing by deleting it from the database.
 *
 * @param course The course this listing is for.
 * @param userID The user that is tutoring for this listing.
 * @return A promise containing nothing.
 */
TutorModel.delete = function(course, userID) {
	return db.query('DELETE FROM tritor_tutorlist WHERE classID = ? AND tutorID = ? LIMIT 1', [course, userID]);
}

/**
 * Get all listings for a certain course.
 *
 * @param course The course you want all listings for.
 * @return A promise containing all listings for the specified course.
 *         Listings will be objects containing tutorID, description, avgRating, 
 *         price, and negotiable. 
 */
TutorModel.get = function(course) {
	// Return tutor listing attributes
	var columns = ['tutorID', 'description', 'avgRating', 'price', 'negotiable'];
	// Only find matching listings
	var conditions = 'classID=' + course;

	return db.select('tritor_tutorlist', columns, conditions);
}

/**
 * Update a certain listing.
 *
 * @param course The course this listing is for.
 * @param userID The user that is tutoring for this listing.
 * @param data Object containing data in the tutor listings that needs to be
 *        updated. Possible data - avgRating, description, price, negotiable.
 * @return A promise that contains nothing.
 */
TutorModel.update = function(course, userID, data) {
	var conditions = 'classID=' + course + 'AND tutorID=' + userID;

	return db.update('tritor_tutorlist', data, conditions, 1);
}

module.exports = TutorModel;
