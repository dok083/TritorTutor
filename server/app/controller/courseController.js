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

CourseController.displayPage = function(classID) {
	//return the couresInfo get by using the classID
	return CourseModel.getCourse(classID);
}
