"use strict"

/**
 * courseController class is resposible
 */

var CourseModel = require('../model/courseModel.js');

var CourseController = {};


/**
 * Get information for a certain course for coursepage display
 *
 * @param classID: The id of a certain course, e.g. CSE110
 * @return return the information get for a specific classID
 */
CourseController.getCourseInfo = function(classID) {
	//return the couresInfo get by using the classID
	return CourseModel.getByID(classID);
}

/**
 * Get top10 popular courses of all time
 * @return return a promise to retrieve top 10 popular courses
 */
CourseController.getPopularCourses = function() {
	return CourseModel.getByTutorCounts();
}

/**
 * Get course by department
 * @return return a promise to retrieve courses under a given department
 */
CourseController.getByDepartment = function(department) {
	return CourseModel.getByDepartment(department);
}

/**
 * Get course by substring.
 *
 * @param sub the substring to use to find the course
 *
 * @return return a promise to containing a list of courses with the matching
 * substring
 */
CourseController.getBySubstring = function(sub) {
    // get rid of all whitespaces, covert sub to uppercase
    sub.replace(/\ /g, "").toUpperCase();

    // matches the pattern <word><number>, e.g. CSE110CSED110CSE, grab CSE110 only
    var matched = sub.match(/(\w)*+(\d)*/);
    //if found pattern
    if(matched)
    	return CourseModel.getBySubString(matched);
    else //otherwise pass the whole string
    	return CourseModel.getBySubstring(sub);
}

module.exports = CourseController;
