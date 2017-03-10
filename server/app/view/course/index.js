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
	var department = req.params.department;

    // Department lengths are usually 3+ characters.
    if (!department || department.length < 3) {
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

    // Only allow courses with length at least 3.
    if (!courseID || courseID.length < 3) {
        res.status(400).json({message: 'invalid course'});

        return;
    }

 	TutorController.get(courseID.toUpperCase())
 		.then((listings) => {
 			if (listings) {
 				return res.json(listings);
 			}

 			return res.status(400).json({message: 'invalid course'});
 		});
}

module.exports = {
	'/view/:classID': {
		get: getCourseInfo},
	'/tutors/:classID': {
 		get: getTutorListing},
	'/popular': {
		get: getPopularCourses},
	'/:department': {
		get: getByDepartment}
}
