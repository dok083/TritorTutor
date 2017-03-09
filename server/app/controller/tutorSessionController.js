"use strict"

/**
 * The TutorSessionController class is responsible for creating, updating and 
 * getting tutoring sessions.  
 */

var TutorSessionModel = require('../model/tutorSessionModel.js');

var TutorSessionController = {};

/**
 * Add a tutor session
 *
 * @param tutorID The userID of the tutor.
 * @param studentID The userID of the student.
 * @param classID The course of the tutoring session.
 * @param status The session is usually pending on creation.
 * @return Promise containing nothing.
 */
TutorSessionController.add = function(tutorID, studentID, classID) {
	var data = {status: 0}

	return TutorSessionModel.create(tutorID, studentID, classID, data); 
}

/**
 * Update a tutor session
 *
 * @param tutorID The userID of the tutor.
 * @param studentID The userID of the student.
 * @param classID The course of the tutoring session.
 * @param status The session is either pending, ongoing, or complete
 * @return Promise containing nothing.
 */
TutorSessionController.update = function(tutorID, studentID, classID, status) {
	var data = {status: status};

	return TutorSessionModel.update(tutorID, studentID, classID, data);
}

/**
 * Get all sessions that meet the condition
 * 
 * @param tutorID The userID of the tutor.
 * @param studentID The userID of the student.
 * @param classID The course of the tutoring session.
 * @param status The session is either pending, ongoing, or complete
 * @return A promise containing a list for all sessions that match the 
 *         condition.
 */
TutorSessionController.get = function(tutorID, studentID, classID, status)  {
	var conditions = [];

	if(tutorID) {
		conditions.push('tutorID=' + tutorID);
	}

	if(studentID) {
		conditions.push('studentID=' + studentID);	
	}

	if(classID) {
		conditions.push('classID=' + classID);
	}

	if(status) {
		conditions.push('status=' + status);	
	}

	var cond = conditions.join(" AND ");

	return TutorSessionModel.get(cond);
}

/**
 * Get all sessions that have the passed in user
 * 
 * @param userID The userID of the user.
 * @return A promise containing a list for all sessions that match the 
 *         condition.
 */
TutorSessionController.getHistory = function(userID) {
	TutorSessionModel.getByStudent(userID)
		.then((student)=> {
			return TutorSessionModel.getByTutor(userID)
				.then((tutor)=> {
					var history = student.concat(tutor);
					return history;
				});
		});
}


/**
 * Removes a tutoring session when it is rejected by deleting it from the 
 * database.
 * 
 * @param tutorID The userID of the tutor.
 * @param studentID The userID of the student.
 * @param classID The course of the tutoring session.
 * @return Promise containing nothing.
 */
TutorSessionController.remove = function(tutorID, studentID, classID) {
	var data = {status: -1};

	return TutorSessionModel.update(tutorID, studentID, classID, data);
}

module.exports = TutorSessionController;