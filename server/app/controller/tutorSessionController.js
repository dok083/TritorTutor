"use strict"

/**
 * The TutorSessionController class is responsible for creating, updating and 
 * getting tutoring sessions.  
 */

var TutorSessionModel = require('../model/tutorSessionModel.js');
var ProfileModel = require('../model/profileModel.js');
var CourseModel = require('../model/courseModel.js');

var TutorSessionController = {};

/**
 * Add a tutor session
 *
 * @param tutorID The userID of the tutor.
 * @param studentID The userID of the student.
 * @param classID The course of the tutoring session.
 * @return Promise containing nothing.
 */
TutorSessionController.add = function(tutorID, studentID, classID) {
    console.log('Adding')
	return TutorSessionModel.create(tutorID, studentID, classID)
		.then(()=> {
            console.log("Added")
			CourseModel.incrementTutorCounts(classID);
            console.log('added2');
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
TutorSessionController.update = function(sessionID, status) {
	return TutorSessionModel.update(sessionID, status);
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
 * Returns all tutoring sessions between a given student and a given tutor.
 * 
 * @param studentID The ID of the desired student.
 * @param tutorID The ID of the desired tutor.
 * @return A promise containing a list of all sessions between the two.
 */
TutorSessionController.getBetween = function(studentID, tutorID) {
    return TutorSessionModel.getBetween(studentID, tutorID);
}

/**
 * Get all sessions that have the passed in user
 * 
 * @param userID The userID of the user.
 * @return A promise containing a list for all sessions that match the 
 *         condition.
 */
TutorSessionController.getHistory = function(userID) {
    return new Promise(function(resolve, reject) {
        TutorSessionModel.getWithUser(userID)
            .then((results) => {
                if (results.length == 0) {
                    return resolve([]);
                }

                var realResults = [];

                results.forEach((result) => {
                    var newResult = {
                        classID: result.classID,
                        tutorID: result.tutorID,
                        studentID: result.studentID
                    };

                    console.log(result);
                    ProfileModel.get(result.tutorID, 'username')
                        .then((tutor) => {
                            newResult.tutorName = tutor.username;
                        })
                        .then(() => {
                            return ProfileModel.get(result.studentID,
                                                    'username');
                        })
                        .then((student) => {
                            newResult.studentName = student.username;
                        })
                        .then(() => {
                            realResults.push(newResult);

                            if (realResults.length == results.length) {
                                resolve(realResults);
                            }
                        });
                });
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
TutorSessionController.remove = function(sessionID) {
	return TutorSessionModel.update(sessionID, -1);
}

/**
 * Returns a session with the ID passed in.
 *
 * @param sessionID Id of the session.
 * @return A promise that contains the session.
 */
/*TutorSessionController.getByID = function(sessionID) {
	return TutorSessionModel.getByID(sessionID);
}*/

module.exports = TutorSessionController;
