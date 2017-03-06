var TutorController = require('../../controller/tutorController.js');
var requireLoggedIn = require('../../userUtils.js');

/**
 * Allows users to get information about listings for a course
 */

function getTutors(req, res, user) {
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
function updateTutors(req, res) {

}

 module.exports = {
 	'/:id':  {
 		get: requireLoggedIn(getTutors),
 		post: updateTutors
 	} 
 };
