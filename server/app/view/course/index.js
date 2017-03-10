"use strict"

var TutorController = require('../../controller/tutorController.js');
var CourseController = require('../../controller/courseController.js');

// Decorator that forces the user to be logged in.
var requiresLoggedIn = require('../userUtils.js');

function getCourseInfo(req, res) {
	var classID = req.params.classID;

    if (!classID) {
        res.status(400).json({message: 'invalid course ID'});

        return;
    }

	CourseController.getCourseInfo(classID)
		.then((info)=> {
			if (!info) {
				res.status(400).json({message: "course not found"});

				return;
			}

            res.json(info);
		});
}

function getPopularCourses(req, res) {
	CourseController.getPopularCourses()
		.then((results) => {
            res.json(results);
		});
}

function getByDepartment(req, res) {
	var department = req.param.department;

    if (!department) {
        res.status(400).json({message: 'invalid department'});

        return;
    }

	CourseController.getByDepartment(department.toUpperCase())
		.then((results) => {
            res.json(results);
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
