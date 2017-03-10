var TutorController = require('../../controller/tutorController.js');

// Decorator that forces the user to be logged in.
var requiresLoggedIn = require('../userUtils.js');


/**
 * A view the returns the tutoring information (price, negotiable, etc...)
 * for the current user.
 */
function getTutors(req, res, user) {
 	var courseID = req.params.courseID;

 	if(!courseID) {
 		return res.status(400).json({message: 'invalid course'});
 	}

 	TutorController.get(courseID)
 		.then((listings) => {
 			if (listings) {
 				return res.json(listings);
 			}

 			return res.status(400).json({message: 'invalid course'});
 		});
}

/**
 * Updates tutor listing when a new listing is made or deleted 
 * for a certain course
 */
function updateTutors(req, res) {

}

/**
 * Adds a new tutor listing for the given course.
 */
function addTutor(req, res) {
    var courseId = req.params.courseID;
    var userID = req.params.userID;
    var desc = req.params.desc;
    var price = req.params.price;
    var nego = req.params.nego;

    if (!courseID || !userID || !desc || !price || !nego) {
        return res.status(400).json({message: 'invalid parameters'});
    }

    TutorController.add(courseID, userID, desc, price, nego)
        .then()
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
 		get: requiresLoggedIn(getTutors),
 		put: requiresLoggedIn(updateTutors),
        post: requiresLoggedIn(addTutor),
        delete: requiresLoggedIn(deleteTutor)
 	} 
 };
