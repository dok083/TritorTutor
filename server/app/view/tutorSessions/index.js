"use strict"

var TutorSessionController = require('../../controller/tutorSessionController.js');
var requiresLoggedIn = require('../userUtils.js');

/**
 * Get the all sessions involving the user
 *
 */
function getHistory(req, res, user) {
    if(!user.verified) {
        return res.status(400).json({message: 'unverififed user'});
    }

    var userID = req.params.userID;

    TutorSessionController.getHistory(userID)
        .then();

}

/**
 * Update the status of a session. 
 * 0 - pending
 * 1 - ongoing
 * 2 - complete
 * -1 - rejected
 */
function updateSession(req, res, user) {
    if(!user.verified) {
        return res.status(400).json({message: 'unverififed user'});
    }

    var tutorID = req.params.tutorID;
    var studentID = req.params.studentID;
    var classID = req.params.courseID;
    var status = req.params.status;

    TutorSessionController.update(tutorID, studentID, classID, status)
        .then();
}

/**
 * Create a tutoring session.
 */
function createSession(req, res, user) {   
    if(!user.verified) {
        return res.status(400).json({message: 'unverififed user'});
    }

    var tutorID = req.params.tutorID;
    var studentID = req.params.studentID;
    var classID = req.params.courseID;

    TutorSessionController.add(tutorID, studentID, classID)
        .then();
}

/**
 * Get a specific session.
 */
function getSession(req, res, user) {
    if(!user.verified) {
        return res.status(400).json({message: 'unverififed user'});
    }

    var studentID = req.params.studentID;
    var classID = req.params.courseID;
    var status = req.params.status;

    TutorSessionController.get(tutorID, studentID, classID)
        .then();

}

module.exports = {
	'/:id': {
		get: requiresLoggedIn(getHistory)
	},
	'/': {
		get: requiresLoggedIn(getSession),
		post: requiresLoggedIn(createSession),
		put: requiresLoggedIn(updateSession)
	}
}
