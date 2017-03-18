"use strict"

var TutorSessionController = require('../../controller/tutorSessionController.js');
var MessageController = require('../../controller/messageController.js');
var ProfileController = require('../../controller/profileController.js');
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
    var tutorID = req.params.id;
    var studentID = user.userID;

    ProfileController.get(tutorID)
	.then((tutorProfile) => {
	    var tutorUsername = tutorProfile.username;
	    // Check if there is a session that is active/pending from this user to
    	    // the tutor. If so, do not allow this request.
    	    TutorSessionController.getBetween(studentID, tutorID)
        	.then((results)=> {
            	    var hasActiveSession = false;

            	    for (var i = 0; i < results.length; i++) {
                	const status = results[i].status;

                	if (status == 0 || status == 1) {
                    	    return res.status(400).json({message: 'You have already sent a request to this tutor.'});
                	}
            	    }
            		
		    // Otherwise, create a new session.
            	    // Send a message to the tutor stating this user wants tutoring.
            	    // Send a message to the student stating a request has been made.
            	    // Respond with the tutor session ID.
            	    TutorSessionController.add(tutorID, studentID, courseID)
                	.then(()=> {
                    	    console.log(3)
                    	    var tutorMsg = "[" + user.username + "](https://tritontutor.com/profile/" + studentID  + ") has sent you a request to be tutored for ["
					   + courseID + "](https://tritontutor.com/course/" + courseID  + "). Please go to their profile to accept or reject the request.";
                    		
			    var studentMsg = "You have sent a request to be tutored by [" + tutorUsername + "](https://tritontutor.com/profile/"
					     + tutorID + ") for [" + courseID + "](https://tritontutor.com/course/" + courseID + ").";

                    	    console.log(4)

                    	    MessageController.send(0, tutorID, 'Tutor request from ' + user.username, tutorMsg);
                    	    MessageController.send(0, studentID, 'Tutor request to ' + tutorUsername + ' sent', studentMsg);
                    	    console.log('yooo')
                    	    res.json({message: 'success'});
                	});
        	});
	});
}

/**
 * Allows a user to give a response to a session request.
 */
/*function requestSessionResponse(req, res, user) {
    if (!user.verified) {
        return res.status(400).json({message: 'unverififed user'});
    }

    var studentID = req.params.id;
    var tutorID = user.userID;
    var accept = Boolean(req.body.accept);

    // Find a pending session with the studentID and courseID.
    // If one does not exist, then error.
    TutorSessionController.getBetween(studentID, tutorID)
        .then((results)=> {
            var session;

            for (var i = 0; i < results.length; i++) {
              if (results[i].status == 0) {
                session = results[i];

                break;
              }
            }

            if (!session) {
                return res.status(400).json({message: 'pending session does not exist'});
            }
            console.log(session)
            // Otherwise, set the session state to active if accept is true or
            // delete the request if false.
            // Send a message to the student with the result of the response.
            // Send a message to the tutor indicate the response.
            if (accept) {
                TutorSessionController.update(session.sessionID, 1)
                    .then(()=> {
                        var tutor = "Hey dood, It's me Tritor. You just accepted a request for tutoring."
                        var student = "hey dood, It's me Tritor. Your request to " + user.username + " was accepted." 
                        MessageController.send(0, studentID, user.username + ' accepted your request', student);
                        MessageController.send(0, tutorID, 'You accepted a request', tutor);

                        res.json({message: 'success'});
                    });
            } else {
                TutorSessionController.update(session.sessionID, -1)
                    .then(()=> {
                        var tutor = "Hey dood, It's me Tritor. You just rejected a request for tutoring."
                        var student = "hey dood, It's me Tritor. Your request to " + user.username + " was rejected." 
                        MessageController.send(0, studentID, user.username + ' rejected your request', student);
                        MessageController.send(0, tutorID, 'You rejected a request', tutor);

                        res.json({message: 'success'});
                    });
            }
        });
}*/

/**
 * Ends a session from a given session ID.
 */
/*function sessionFinish(req, res, user) {
    if (!user.verified) {
        return res.status(400).json({message: 'unverififed user'});
    }

    var sessionID = req.params.id;

    // Get the session the user wants.
    TutorSessionController.getByID(sessionID)
        .then((session) => {
            if (session && session.status == 1 &&
                (session.tutorID == user.userID || session.studentID == user.userID)) {
                TutorSessionController.update(session.sessionID, 2)
                    .then(()=> {
                            var tutor = "Your session with " + session.studentID + " for " 
                                        + session.classID + " has been canceled." 
                            var student = "Your session with " + session.tutorID + " for " 
                                        + session.classID + " has been canceled."

                            MessageController.send(0, session.studentID, 'Session Canceled', student);
                            MessageController.send(0, session.tutorID, 'Session Canceled', tutor);

                            res.json({message: 'success'});
                    });
            } else {
                res.status(400).json({message: 'The tutor session could not be found.'});
            }
        });
}*/

/**
 * Returns all sessions between the current user and the desired user.
 */
function getSessionsWith(req, res, user) {
    if (!user.verified) {
        return res.status(400).json({message: 'You are not verififed user'});
    }

    const userID = user.userID;
    const otherID = req.params.id;

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
/**
  * Ends a session from a given session ID.
  */
function sessionFinish(req, res, user) {
    if (!user.verified) {
	return res.status(400).json({message: 'You are not verified'});
    }

    var sessionID = req.params.id;

    // Get the session the user wants.
    TutorSessionController.getByID(sessionID)
	.then((session) => {
	    if(session.tutorID == user.userID) {
		var isTutor = true;
		var isStudent = false;
	    } else if (session.studentID == user.userID){
		var isTutor = false;
		var isStudent = true;
	    }

	    //session exists and status of tutoring is ongoing and user is either student or tutor
	    if (session && session.status == 1 && (isTutor || isStudent)) {
	    TutorSessionController.update(session.sessionID, 2)
		.then(()=> {
		    if (isTutor){       //the user is a tutor (can get username), get student's username
			ProfileController.get(session.studentID)
			    .then((studentProfile)=>{
				var studentUsername = studentProfile.username;

				var tutorMsg = "Your session with student [" + studentUsername + "](https://tritontutor.com/profile/" + session.studentID  + ") for ["
						+ session.classID + "](https://tritontutor.com/course/" + session.classID + ") has been canceled."

				var studentMsg = "Your session with tutor [" + user.username + "](https://tritontutor.com/profile/" + session.tutorID  + ") for ["
						+ session.classID + "](https://tritontutor.com/course/" + session.classID + ") has been canceled."

				MessageController.send(0, session.studentID, 'Session ended', studentMsg);
				MessageController.send(0, session.tutorID, 'Session ended', tutorMsg);
				res.json({message: 'success'});
			    }); 
		    } else if (isStudent) {     //the user is a student (can get username), get tutor's username
			ProfileController.get(session.tutorID)
			    .then((tutorProfile)=>{ 
				var tutorUsername = tutorProfile.username;
				
				var tutorMsg = "Your session with student [" + user.username + "](https://tritontutor.com/profile/" + session.studentID  + ") for ["
						+ session.classID + "](https://tritontutor.com/course/" + session.classID + ") has been canceled." 

				var studentMsg = "Your session with tutor [" + tutorUsername + "](https://tritontutor.com/profile/" + session.tutorID  + ") for ["
						+ session.classID + "](https://tritontutor.com/course/" + session.classID + ") has been canceled."

				MessageController.send(0, session.studentID, 'Session ended', studentMsg);
				MessageController.send(0, session.tutorID, 'Session ended', tutorMsg);
				res.json({message: 'success'});
			    });
		    }
		});
	    } else {
		res.status(400).json({message: 'The tutor session could not be found.'});
	    }
	});
}

/* Allows a user to give a response to a session request.
 */
function requestSessionResponse(req, res, user) {
	if (!user.verified) {
	    return res.status(400).json({message: 'You are not verified'});
	}
	var studentID = req.params.id;
	var tutorID = user.userID;
	var accept = Boolean(req.body.accept);
	
	// Get this username of the student
	ProfileController.get(studentID)
		.then((studentProfile) => {
			var studentUsername = studentProfile.username;
			// Find a pending session with the studentID and courseID.
			// If one does not exist, then error.
			TutorSessionController.getBetween(studentID, tutorID)
				.then((results)=> {
					var session;

					for (var i = 0; i < results.length; i++) {
						if (results[i].status == 0) {
							session = results[i];

							break;
						}
					}
					if (!session) {
						return res.status(400).json({message: 'You do not have a pending request from this user'});
					}
					console.log(session)
					// Otherwise, set the session state to active if accept is true or                                                                                                                                                         81,0-1
					// delete the request if false.
					// Send a message to the student with the result of the response.
					// Send a message to the tutor indicate the response.
					if (accept) {
						TutorSessionController.update(session.sessionID, 1)
							.then(()=> {
								var tutorMsg = "You accepted a tutoring request from [" + studentUsername + "](https://tritontutor.com/profile/"
										+ studentID + ") for [" + session.classID + "](https://tritontutor.com/course/" + session.classID + ").";
						 		var studentMsg = "Your request to be tutored by [" + user.username + "](https://tritontutor.com/profile/" + tutorID
										+ ") for [" + session.classID + "](https://tritontutor.com/course/" + session.classID + ") has been accepted.";
							MessageController.send(0, studentID, user.username + " accepted your request", studentMsg);
                                 			MessageController.send(0, tutorID, 'You accepted a request', tutorMsg);
 
                                 			res.json({message: 'success'});
                             				});
                     			} else {
                         			TutorSessionController.update(session.sessionID, -1)
                             				.then(()=> {
                                 				var tutorMsg = "You rejected a tutoring request from [" + studentUsername + "](https://tritontutor.com/profile/"
                                                				+ studentID + ") for [" + session.classID + "](https://tritontutor.com/course/" + session.classID + ").";
                                 				var studentMsg = "Your request to be tutored by [" + user.username + "](https://tritontutor.com/profile/" + tutorID
						  				+ ") for [" + session.classID + "](https://tritontutor.com/course/" + session.classID + ") has been rejected.";
 
                                 				MessageController.send(0, studentID, user.username + ' rejected your request', studentMsg);
                                 				MessageController.send(0, tutorID, 'You rejected a request', tutorMsg);
 
                                 				res.json({message: 'success'});
                             				});
                     			}
                 		});
         	});
}

//TODO
    /**
  * Ends a session from a given session ID.
  */
/* function sessionFinish(req, res, user) {
if (!user.verified) {
return res.status(400).json({message: 'You are not verified'});
}

var sessionID = req.params.id;

// Get the session the user wants.
TutorSessionController.getByID(sessionID)
.then((session) => {
if(session.tutorID == user.userID) {
var isTutor = true;
var isStudent = false;
} else if (session.studentID == user.userID){
var isTutor = false;
var isStudent = true;
}

//session exists and status of tutoring is ongoing and user is either student or tutor
if (session && session.status == 1 && (isTutor || isStudent)) {
TutorSessionController.update(session.sessionID, 2)
.then(()=> {
if (isTutor){       //the user is a tutor (can get username), get student's username
ProfileController.get(session.studentID)
.then((studentProfile)=>{
var studentUsername = studentProfile.username;

var tutorMsg = "Your session with [" + studentUsername + "](https://tritontutor.com/profile/" + session.tutorID  + ") for ["
+ session.classID + "](https://tritontutor.com/course/" + session.classID + ") has been canceled."

var studentMsg = "Your session with [" + user.username + "](https://tritontutor.com/profile/" + session.tutorID  + ") for ["
+ session.classID + "](https://tritontutor.com/course/" + session.classID + ") has been canceled."

MessageController.send(0, session.studentID, 'Session ended', studentMsg);
MessageController.send(0, session.tutorID, 'Session ended', tutorMsg);
res.json({message: 'success'});
}); 
} else if (isStudent) {     //the user is a student (can get username), get tutor's username
ProfileController.get(session.tutorID)
.then((tutorProfile)=>{ 
var tutorUsername = tutorProfile.username;

var tutorMsg = "Your session with student [" + user.username + "](https://tritontutor.com/profile/" + session.studentID  + ") for ["
+ session.classID + "](https://tritontutor.com/course/" + session.classID + ") has been canceled." 

var studentMsg = "Your session with [" + tutorUsername + "](https://tritontutor.com/profile/" + session.tutorID  + ") for ["
+ session.classID + "](https://tritontutor.com/course/" + session.classID + ") has been canceled."

MessageController.send(0, session.studentID, 'Session ended', studentMsg);
MessageController.send(0, session.tutorID, 'Session ended', tutorMsg);
res.json({message: 'success'});
});
}
});
} else {
res.status(400).json({message: 'The tutor session could not be found.'});
}
});
}*/
//TODO
 /* Allows a user to give a response to a session request.
 */
/* function requestSessionResponse(req, res, user) {
 if (!user.verified) {
 return res.status(400).json({message: 'You are not verified'});
 }
 
var studentID = req.params.id;
 var tutorID = user.userID;
 var accept = Boolean(req.body.accept);
 
 // Get this username of the student
 ProfileController.get(studentID)
 .then((studentProfile) => {
 var studentUsername = studentProfile.username;
 // Find a pending session with the studentID and courseID.
 // If one does not exist, then error.
TutorSessionController.getBetween(studentID, tutorID)
.then((results)=> {
var session;

for (var i = 0; i < results.length; i++) {
if (results[i].status == 0) {
session = results[i];

break;
}
}

if (!session) {
return res.status(400).json({message: 'You do not have a pending request from this user'});
}
console.log(session)
// Otherwise, set the session state to active if accept is true or                                                                                                                                                         81,0-1
// delete the request if false.
// Send a message to the student with the result of the response.
// Send a message to the tutor indicate the response.
if (accept) {
                         TutorSessionController.update(session.sessionID, 1)
                             .then(()=> {
 
                                 var tutorMsg = "You accepted a tutoring request from [" + studentUsername + "](https://tritontutor.com/profile/"
                                                + studentID + ") for [" + session.classID + "](https://tritontutor.com/course/" + session.classID + ").";
                                 var studentMsg = "Your request to be tutored by [" + user.username + "](https://tritontutor.com/profile/" + tutorID
						+ ") for [" + session.classID + "](https://tritontutor.com/course/" + session.classID + ") has been accepted.";
 
                                 MessageController.send(0, studentID, user.username + " accepted your request", studentMsg);
                                 MessageController.send(0, tutorID, 'You accepted a request', tutorMsg);
 
                                 res.json({message: 'success'});
                             });
                     } else {
                         TutorSessionController.update(session.sessionID, -1)
                             .then(()=> {
                                 var tutorMsg = "You rejected a tutoring request from [" + studentUsername + "](https://tritontutor.com/profile/"
                                                + studentID + ") for [" + session.classID + "](https://tritontutor.com/course/" + session.classID + ").";
                                 var studentMsg = "Your request to be tutored by [" + user.username + "](https://tritontutor.com/profile/" + tutorID
						  + ") for [" + session.classID + "](https://tritontutor.com/course/" + session.classID + ") has been rejected.";
 
                                 MessageController.send(0, studentID, user.username + ' rejected your request', studentMsg);
                                 MessageController.send(0, tutorID, 'You rejected a request', tutorMsg);
 
                                 res.json({message: 'success'});
                             });
                     }
                 });
         });
 }*/
module.exports = {
	'/:id': {
        get: requiresLoggedIn(getSessionsWith),
        post: requiresLoggedIn(requestSession),
        put: requiresLoggedIn(requestSessionResponse),
        delete: requiresLoggedIn(sessionFinish)
	},
	'/': {
        get: requiresLoggedIn(getHistory)
	}
}
