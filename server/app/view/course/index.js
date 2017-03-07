"use strict"

var TutorController = require('../../controller/tutorController.js');

// Decorator that forces the user to be logged in.
var requiresLoggedIn = require('../userUtils.js');

/**
 * Allows users to get information about listings for a course
 */

function getTutors(req, res) {
 	var courseID = req.params.courseID;

 	if(!courseID) {
 		return res.status(400).json({message: 'invalid course'});
 	}

 	TutorController.get(courseID)
 		.then((listings) => {
 			if(listings && listings.length() > 0) {
 				return res.json(listings);
 			}

 			return res.status(400).json({message: 'invalid course'});
 		});
}

 module.exports = {
 	'/:id':  {
 		get: getTutors
 	}
}