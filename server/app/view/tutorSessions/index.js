"use strict"

var TutorSessionController = require('../../controller/tutorSessionController.js');
var MessageController = require('../../controller/messageController.js');
var requiresLoggedIn = require('../userUtils.js');

/**
 * 0 - pending
 * 1 - ongoing
 * 2 - complete
 * -1 - rejected
 */

/**
 * Get the all sessions involving the user
 */
function getHistory(req, res, user) {
    if (!user.verified) {
        return res.status(400).json({message: 'unverififed user'});
    }
    console.log(user.userID);
    TutorSessionController.getHistory(user.userID)
        .then((results) => {
            res.json(results);
        });
}

/**
 * Sends a request for a session to another user.
 */
function requestSession(req, res, user) {
    if (!user.verified) {
        return res.status(400).json({message: 'unverififed user'});
    }

    var courseID = req.body.courseID;
    var tutorID = req.body.tutorID;
    var studentID = req.body.id;

    // Check if there is a session that is active/pending from this user to
    // the tutor. If so, do not allow this request.
    TutorSessionController.getBetweenCourse(tutorID, studentID, courseID)
        .then((session)=> {
            if (session.status == 0 || session.status == 1) {
                return res.status(400).json({message: 'pending session exists'});
            }
            else {
                // Otherwise, create a new session.
                // Send a message to the tutor stating this user wants tutoring.
                // Send a message to the student stating a request has been made.
                // Respond with the tutor session ID.
                TutorSessionController.add(tutorID, studentID, courseID)
                    .then((sessionID)=> {
                        res.json(sessionID);

                        var tutor = "Hey dood, It's me Tritor. Someone wants your help"
                        var student = "hey dood, It's me Tritor. I sent your request."
                        MessageController.send(0, tutorID, 'Tutor request from ' + user.username ,tutor);
                        MessageController.send(0, studentID, 'Tutor request sent', student);
                        
                    });                
            }
        });
}

/**
 * Allows a user to give a response to a session request.
 */
function requestSessionResponse(req, res, user) {
    if (!user.verified) {
        return res.status(400).json({message: 'unverififed user'});
    }

    var courseID = req.params.courseID;
    var studentID = req.params.studentID;
    var tutorID = req.params.id;
    var accept = req.params.accept;

    // Find a pending session with the studentID and courseID.
    // If one does not exist, then error.
    TutorSessionController.getBetweenCourse(tutorID, studentID, courseID)
        .then((session)=> {
            if (session.status != 0) {
                return res.status(400).json({message: 'pending session does not exist'});
            }
            else {
                // Otherwise, set the session state to active if accept is true or
                // delete the request if false.
                // Send a message to the student with the result of the response.
                // Send a message to the tutor indicate the response.
                if (accept) {
                    TutorSessionController.update(tutorID, studentID, courseID, 1)
                        .then(()=> {
                            var tutor = "Hey dood, It's me Tritor. You just accepted a request for tutoring."
                            var student = "hey dood, It's me Tritor. Your request to " + user.username + " was accepted." 
                            MessageController.send(0, studentID, user.username + ' accepted your request', student);
                            MessageController.send(0, tutorID, 'You accepted a request', tutor);
                        });
                } 
                else {
                    TutorSessionController.remove(tutorID, studentID, courseID)
                        .then(()=> {
                            var tutor = "Hey dood, It's me Tritor. You just rejected a request for tutoring."
                            var student = "hey dood, It's me Tritor. Your request to " + user.username + " was rejected." 
                            MessageController.send(0, studentID, user.username + ' rejected your request', student);
                            MessageController.send(0, tutorID, 'You rejected a request', tutor);
                        });
                }
            }
        });
}

/**
 * Ends a session from a given session ID.
 */
function sessionFinish(req, res, user) {
    if (!user.verified) {
        return res.status(400).json({message: 'unverififed user'});
    }

    var sessionID = req.params.tutorSessionID;

 	// Check if there is a session with the other user. Note that it does not
    // matter if the user is the tutor or student.
    TutorSessionController.getByID(sessionID)
    	.then((session)=> {
    		// Otherwise, set the state to finished.
    		if (session.length > 0 && session[0].status != 2) {
    			TutorSessionController.update(session.tutorID, session.studentID, session.classID, 2)
    				.then(()=> {
							var tutor = "Your session with " + session.studentID + " for " 
										+ session.classID + " has been canceled." 
                            var student = "Your session with " + session.tutorID + " for " 
                            			+ session.classID + " has been canceled."
                            MessageController.send(0, session.studentID, 'Session Canceled', student);
                            MessageController.send(0, session.tutorID, 'Session Canceled', tutor);
    				});
    		}
    		// If there is not one, then error.
    		else {
    			return res.status(400).json({message: 'session does not exist'});
    		}
    	});
}

/**
 * Returns all sessions between the current user and the desired user.
 */
function getSessionsWith(req, res, user) {
    if (!user.verified) {
        return res.status(400).json({message: 'unverififed user'});
    }

    const userID = user.id;
    const otherID = req.params.otherID;

    // Return all the sessions (does not matter if the user is tutor or student)
    // where the user corresponding to otherID is involved. Only include
    // either pending or active sessions.
    TutorSessionController.getPair(userID, otherID)
        .then((sessions)=> {
        	var filterSessions = sessions
        		.filter((sessions)=> {
        			return sessions.status > -1;
        		});
		res.json(filterSessions);
        });
}

module.exports = {
	'/:id': {
        get: requiresLoggedIn(getSessionsWith),
        post: requiresLoggedIn(requestSession),
        put: requiresLoggedIn(requestSessionResponse)
	},
	'/': {
        get: requiresLoggedIn(getHistory),
        put: requiresLoggedIn(sessionFinish)
	}
}
