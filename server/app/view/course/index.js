"use strict"

var TutorController = require('../../controller/tutorController.js');
var CourseController = require('../../controller/courseController.js');

// Decorator that forces the user to be logged in.
var requiresLoggedIn = require('../userUtils.js');

function getCourseInfo(req, res) {
	var classID = req.param.classID;
	CourseController.getCourseInfo(classID)
		.then((results)=> {
			if (results && results.length > 0) {
				res.status(400).json({message: "course not found"});
				return;
			}
			return;
		});
}

function getPopularCourses(req, res) {
	CourseController.getPopularCourses()
		.then((results) => {
			return results;
		});
}

function getByDepartment(req, res) {
	var department = req.param.department;
	CourseController.getByDepartment(department)
		.then((results) => {
			return results;
		});
}


/**
 * Allows users to get information about listings for a course
 */
function getTutorListing(req, res) {
 	var courseID = req.params.classID;

 	TutorController.get(courseID)
 		.then((listings) => {
 			if(listings && listings.length > 0) {
 				return res.json(listings);
 			}

 			return res.status(400).json({message: 'invalid course'});
 		});
}

module.exports = {
	'/view/:classID': {
		get: getCourseInfo},
	'/:classID/tutorListing': {
 		get: getTutorListing},
	'/popularCourses': {
		get: getPopularCourses},
	'/:department': {
		get: getByDepartment}
}
