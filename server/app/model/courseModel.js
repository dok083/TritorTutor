"use strict"

/**
 * This file contains the CourseModel which is responsible for displaying 
 * course page.
 */

var db = require('./database.js');

var CourseModel = {};

/**
 * Get course information from database by classID
 * @param classID ID of a specific course i.g. CSE110
 * @return return a promise that retrieve course information by givin classID. 
 */
CourseModel.getByID = function(classID) {
	classID = classID.toUpperCase();
	//set condition to classID in order to retrieve one row
	condition = 'classID ' + classID;


	return db.select('tritor_classlist', ['classID', 'courseName', 'description', 'department'], condition, 1)
		.then((results) => {
			if (results && results.length > 0) {
				return {
					classID: results[0].classID,
					courseName: results[0].courseName,
					description: results[0].description,
					department: results[0].department
				};
			}
			return null;
		});
}

/**
 * Update tutorCount of a certain course
 * @param classID ID of a specific course, i.g. CSE110
 * @return return a promise to increment a certain field of a certain row.
 */
CourseModel.updateCounts = function(classID) {
	classID = classID.toUpperCase();
	value = 1; //tutorCount will be incremented by 1
	condition = 'classID ' + classID;

	return db.increment('tritor_classlist', 'tutorCount', 1, condition);
}

/**
 * Get a list of top 10 popular courses, ordered by number of tutors ssgend up 
 * for that course
 * @return return a promise that retrieve the top 10 courses by tutorCounts
 */
CourseModel.getByTutorCounts = function() {
	//retrun the first 10 courses with most tutors
	return db.select('tritor_classlist', ['classID'], null, 10, 'DESC');
}

/**
 * Get a list of popular courses under a certain department
 * @param department the abbreviation of a certain department, e.g. CSE, Math
 * @return return a promise that retrieve all courses under a certain department
 */
CourseModel.getByDepartment = function(department) {
	var condition = 'department=' + department;
	//select all courses under the department
	return db.select('tritor_classlist', ['classID'], condition);
}
