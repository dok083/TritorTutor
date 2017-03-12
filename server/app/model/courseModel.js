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
    return db.query('UPDATE tritor_classlist SET tutorCount = tutorCount + 1' +
                    ' WHERE classID=' + db.escape(classID)); 
}


/**
 * Decrement tutorCount of a certain course
 * @param classID ID of a specific course, i.g. CSE110
 * @return return a promise to increment a certain field of a certain row.
 */
CourseModel.decrementTutorCounts = function(classID) {
	classID = classID.toUpperCase();
	var value = -1; //tutorCount will be decremented by 1
	var condition = 'classID=' + db.escape(classID);
	return db.increment('tritor_classlist', 'tutorCount', 1, condition);
}

/**
 * Get a list of top 10 popular courses, ordered by number of tutors ssgend up 
 * for that course
 * @return return a promise that retrieve the top 10 courses by tutorCounts
 */
CourseModel.getByTutorCounts = function() {
    //Select classID from tritor_classlist order by tutorCount desc limit 10
    return db.select('tritor_classlist', ['classID'], null, 10, 'tutorCount DESC') 
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

/**
 * Get a list of popular courses under a certain department
 *
 * @param sub the substring to use to find the course
 *
 * @return return a promise containing a list of courses with the matching
 * substring
 */
CourseModel.getBySubstring = function(sub) {
    var condition = 'classID like \'%' + sub + '%\'';

	//select all courses under the department
	return db.select('tritor_classlist', ['classID', 'className'], condition)
        .then(
        (results) => {
            // convert the return value
            return results.map((result) => {
                // return an object with the classID and className strings of 
                // this class
                return {
                    classID: result.classID,
                    className: result.className
                };
            });
        });
}

module.exports = CourseModel;
