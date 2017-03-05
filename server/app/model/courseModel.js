"use strict"

/**
 * This file contains the CourseModel which is responsible for displaying 
 * course page.
 */

var db = require('./database.js');

var CourseModel = {};

/**
 * Craete a new entry in tritor_classlist table in database
 *
 * @param classID: ID of a certain course, e.g. CSE110, MATH109
 * @param description: Description of the course
 * @param department: Department of the course
 * @param bool_upper: True if the course is in upper-division
 */
CourseModel.create = function(classID, description, department, bool_upper, tutorCounts) {
	return db.insert('tritor_classlist', {
		classID: classID,
		description: description,
		department: department,
		upperDivision: bool_upper,
		tutorCounts: tutorCounts
	});
}


/**
 * Delete a certain course from database
 */
CourseModel.delete = function(classID) {
	//TODO
}

/**
 * Get course information from database
 * 
 * @param classID
 *
 */
CourseModel.getCourse = function(classID) {
	//TODO	
}

/**
 * Update tutorCount of a certain course
 */
CourseModel.update = function(classID) {
	//TODO
}

/**
 * Get a list of popular courses, ordered by number of tutors sigend up for that course
 */
CourseModel.getByTutorCounts = function(classID) {
	//TODO
}

CourseModel.getByDepartment = function(department) {
	//TODO
}

module.exports = CourseModel;
