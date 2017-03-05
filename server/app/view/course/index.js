var TutorController = require('../../controller/tutorController.js');

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

/**
 * Updates tutor listing when a new listing is made or deleted 
 *for a certain course
 */
function addTutor(req, res) {
	var courseId = req.params.courseID;
	var userID = req.params.userID;
	var desc = req.params.desc;
	var price = req.params.price;
	var nego = req.params.nego;

	if(!courseID || !userID || !desc || !price || !nego) {
		return res.status(400).json({message: 'invalid parameters'});
	}

	TutorController.add(courseID, userID, desc, price, nego)
		.then();
}

function deleteTutor(req, res) {
	var courseID = req.params.courseID;
	var userID = req.params.userID;

	if(!courseID || !userID) {
		return res.status(400).json({message: 'listing not found'});
	}

	TutorController.remove(courseID, userID)
		.then();
}

 module.exports = {
 	'/:id':  {
 		get: getTutors,
 		post: addTutor,
 		delete: deleteTutor
 	} 