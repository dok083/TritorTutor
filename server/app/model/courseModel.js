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
	//set condition to classID in order to retrieve one row
	var condition = 'classID=' + db.escape(classID);

	return db.select('tritor_classlist', ['className', 'description', 'department'], condition, 1)
		.then((results) => {
			if (results && results.length > 0) {
				return {
					courseName: results[0].className,
					description: results[0].description,
					department: results[0].department
				};
			}

			return null;
		});
}

/**
 * Increment tutorCount of a certain course
 * @param classID ID of a specific course, i.g. CSE110
 * @return return a promise to increment a certain field of a certain row.
 */
CourseModel.incrementTutorCounts = function(classID) {
	value = 1; //tutorCount will be incremented by 1
	var condition = 'classID=' + db.escape(classID);

	return db.increment('tritor_classlist', 'tutorCount', 1, condition);
}


/**
 * Decrement tutorCount of a certain course
 * @param classID ID of a specific course, i.g. CSE110
 * @return return a promise to increment a certain field of a certain row.
 */
CourseModel.decrementTutorCounts = function(classID) {
	classID = classID.toUpperCase();
	value = -1; //tutorCount will be decremented by 1
	var condition = 'classID=' + db.escape(classID);
	return db.increment('tritor_classlist', 'tutorCount', 1, condition);
}

/**
 * Get a list of top 10 popular courses, ordered by number of tutors ssgend up 
 * for that course
 * @return return a promise that retrieve the top 10 courses by tutorCounts
 */
CourseModel.getByTutorCounts = function() {
	//retrun the first 10 courses with most tutors
    // TODO: Generate query that selects top 10 rows in tritor_classlist
    // Need to somehow use a query that can ORDER BY the COUNT of classID
    // in tritor_tutor_list
	return db.select('tritor_classlist', ['classID'], null, 10/*, 'DESC'*/)
        .then((results) => {
            return results.map((result) => {
                return result.classID;
            });
        });
}

/**
 * Get a list of popular courses under a certain department
 * @param department the abbreviation of a certain department, e.g. CSE, Math
 * @return return a promise that retrieve all courses under a certain department
 */
CourseModel.getByDepartment = function(department) {
    department = db.escape(department);

    var condition = 'classID LIKE ' +
                    department.substring(0, department.length - 1) + '%\'';

	//select all courses under the department
	return db.select('tritor_classlist', ['classID'], condition)
        .then((results) => {
            return results.map((result) => {
                return result.classID;
            });
        });
}

module.exports = CourseModel;
