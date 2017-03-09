"use strict"

var TutorSessionController = require('../../controller/tutorSessionController.js');
var requiresLoggedIn = require('../userUtils.js');

/**
 * Get the all sessions involving the user
 */
function getHistory(req, res, user) {
    if(!user.verified) {
        return res.status(400).json({message: 'unverififed user'});
    }

    TutorSessionController.getHistory(user.userID)
        .then((results) => {
            res.json(results);
        });
}

/**
 * Sends a request for a session to another user.
 */
function requestSession(req, res, user) {
    var courseID = req.body.courseID;
    var tutorID = req.params.id;

    // Check if there is a session that is active/pending from this user to
    // the tutor. If so, do not allow this request.

    // Otherwise, create a new session.
    // Send a message to the tutor stating this user wants tutoring.
    // Send a message to the student stating a request has been made.
    // Respond with the tutor session ID.
}

/**
 * Allows a user to give a response to a session request.
 */
function requestSessionResponse(req, res, user) {
    var courseID = req.body.courseID;
    var studentID = req.params.id;
    var accept = req.params.accept;

    // Find a pending session with the studentID and courseID.
    // If one does not exist, then error.
    // Otherwise, set the session state to active if accept is true or
    // delete the request if false.
    // Send a message to the student with the result of the response.
    // Send a message to the tutor indicate the response.
}

/**
 * Ends a session from a given session ID.
 */
function sessionFinish(req, res, user) {
    var otherID = req.body.otherID;
    var courseID = req.body.courseID;

    // Check if there is a session with the other user. Note that it does not
    // matter if the user is the tutor or student.

    // If there is not one, then error.

    // Otherwise, set the state to finished.

    // Notify both users that the tutor session is over.
}

/**
 * Returns all sessions between the current user and the desired user.
 */
function getSessionsWith(req, res, user) {
    const otherID = req.body.otherID;

    // Return all the sessions (does not matter if the user is tutor or student)
    // where the user corresponding to otherID is involved. Only include
    // either pending or active sessions.
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
}

module.exports = {
	'/:id': {
		get: requiresLoggedIn(getSessionsWith),
        post: requiresLoggedIn(requestSession, true),
        put: requiresLoggedIn(requestSessionResponse)
	},
	'/': {
        get: requiresLoggedIn(getHistory)
	}
}
