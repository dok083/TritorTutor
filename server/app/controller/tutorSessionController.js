"use strict"

/**
 * The TutorSessionController class is responsible for creating, updating and 
 * getting tutoring sessions.  
 */

var TutorSessionModel = require('../model/tutorSessionModel.js');
var CourseModel = require('../model/courseModel.js');

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

	return TutorSessionModel.create(tutorID, studentID, classID, data)
		.then(()=> {
			CourseModel.incrementTutorCounts(classID);
		}); 
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
 * Returns all the sessions between a student and a tutor.
 *
 * @param studentID The user ID for the student.
 * @param tutorID The user ID for the tutor.
 * @return A promise that contains the list of all sessions between the two.
 */
TutorSessionController.getBetween = function(studentID, tutorID) {
	return TutorSessionModel.getBetween(studentID, tutorID);
}

/**
 * Returns all the sessions between a student and a tutor.
 *
 * @param studentID The user ID for the student.
 * @param tutorID The user ID for the tutor.
 * @return A promise that contains the list of all sessions between the two.
 */
TutorSessionController.getBetweenCourse = function(studentID, tutorID, classID) {
	return TutorSessionModel.getBetween(studentID, tutorID, classID);
}

/**
 * Returns all the sessions between a user and another.
 *
 * @param studentID The user ID for the student.
 * @param tutorID The user ID for the tutor.
 * @return A promise that contains the list of all sessions between the two.
 */
TutorSessionController.getPair = function(userID, otherID) {
	return TutorSessionModel.getPair(userID, otherID);
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

	return TutorSessionModel.update(tutorID, studentID, classID, data)
		.then(()=> {
			CourseModel.decrementTutorCounts(classID);
		});
}

/**
 * Returns a session with the ID passed in.
 *
 * @param sessionID Id of the session.
 * @return A promise that contains the session.
 */
TutorSessionController.getByID = function(sessionID) {
	return TutorSessionModel.getByID(sessionID);
}

module.exports = TutorSessionController;
