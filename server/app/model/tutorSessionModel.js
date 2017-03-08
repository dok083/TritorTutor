"use strict"

/**
 * This file contains the TutorSessionModel which is responsible for access
 * to tutoring sessions on the database.
 */

var db = require('./database.js');

var TutorSessionModel = {};

/**
 * Creates a tutoring session by inserting it into the database
 * 
 * @param tutorID The userID of the tutor.
 * @param studentID The userID of the student.
 * @param classID The course of the tutoring session.
 * @param status The session is either pending, rejected, ongoing, or complete
 * @return Promise containing nothing.
 */
TutorSessionModel.create = function(tutorID, studentID, classID, status) {
	return db.insert('tritor_tutor_sessions', {
		tutorID: tutorID,
		studentID: studentID,
		classID: classID,
		status: status,
	});
}

/**
 * Updates a certain session.
 *
 * @param tutorID The userID of the tutor.
 * @param studentID The userID of the student.
 * @param classID classID The course of the tutoring session.
 * @param data Object containing data in the session that needs to be updated.
 *        Most likely only the status is ever updated.
 * @return Promise containing nothing.
 */
TutorSessionModel.update = function(tutorID, studentID, classID, data) {
	var conditions = 'tutorID=' + tutorID + 'AND studentID=' + studentID + 
		'AND classID=' + classID;

	return db.update('tritor_tutor_sessions', data ,conditions, 1);
}

/**
 * Get all sessions that meet the condition
 * 
 * @param conditions get all rows that meet these conditions
 * @return A promise containing a list for all sessions that match the 
 *         condition.
 */
TutorSessionModel.get = function(conditions) {
	var columns = null;

	return db.select('tritor_tutor_sessions', columns, conditions);
}

module.exports = TutorSessionModel;