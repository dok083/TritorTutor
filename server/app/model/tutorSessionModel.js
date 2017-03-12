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
 * @return Promise containing the ID of a tutor session.
 */
TutorSessionModel.create = function(tutorID, studentID, classID) {
    return db.insert('tritor_tutor_sessions', {
        tutorID: tutorID,
        studentID: studentID,
        classID: classID,
        status: 0
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
TutorSessionModel.update = function(sessionID, status) {
    //var conditions = 'tutorID=' + tutorID + ' AND studentID=' + studentID;
    var conditions = 'sessionID=' + sessionID;
    var data = {
      status: status
    };

    return db.update('tritor_tutor_sessions', data, conditions, 1);
}

/**
 * Returns all tutoring sessions where the user being tutored corresponds to the
 * given user ID.
 *
 * @param studentID The ID of the user being tutored.
 * @return A promise containing a list of matching tutoring sessions.
 */
TutorSessionModel.getByStudent = function(studentID) {
    const fields = ['tutorID', 'classID', 'status', 'sessionID'];

    return db.select('tritor_tutor_sessions', fields,
                     'studentID=' + db.escape(studentID), 1).then((results) => {
        if (results && results.length > 0) {
          results[0].studentID = studentID;

          return results[0];
        }

        return null;
    });
}

/**
 * Returns all tutoring sessions where the tutor corresponds to the given
 * user ID.
 *
 * @param tutorID The user ID of the tutor.
 * @return A promise containing a list of matching tutoring sessions.
 */
TutorSessionModel.getByTutor = function(tutorID) {
    const fields = ['studentID', 'classID', 'status', 'sessionID'];

    return db.select('tritor_tutor_sessions', fields,
    'tutorID=' + db.escape(userID), 1).then((results) => {
        return results.map((result) => {
            result.tutorID = tutorID;

            return result;
        });
    });
}

/**
 * Returns a list of tutor sessions that contains the given user.
 *
 * @param userID The desired user to look for.
 * @return A promise containing a list of matching tutor sessions.
 */
TutorSessionModel.getWithUser = function(userID) {
    userID = db.escape(userID);

    return db.select('tritor_tutor_sessions',
                     ['classID', 'tutorID', 'studentID', 'sessionID'],
                     'studentID=' + userID + ' OR tutorID=' + userID);
}

/**
 * Returns all tutoring sessions where the tutor corresponds to the given
 * user ID.
 *
 * @param userID The user ID of the tutor.
 * @return A promise containing a list of matching tutoring sessions.
 */
TutorSessionModel.getPair = function(userID, otherID) {
    const fields = ['sessionID', 'studentID', 'tutorID', 'classID', 'status'];
    const conditions = '(studentID='+ userID + ' AND tutorID=' + otherID + ')'
                        + ' OR (studentID=' + otherID + ' AND tutorID=' + userID + ')';
    
    return db.select('tritor_tutor_sessions', fields, conditions);
}

/**
 * Returns all tutoring sessions between a given student and a given tutor.
 * 
 * @param studentID The ID of the desired student.
 * @param tutorID The ID of the desired tutor.
 * @return A promise containing a list of all sessions between the two.
 */
TutorSessionModel.getBetween = function(studentID, tutorID) {
    const fields = ['sessionID', 'studentID', 'tutorID', 'classID', 'status'];
    const conditions = 'studentID='+ studentID + ' AND tutorID=' + tutorID;
    
    return db.select('tritor_tutor_sessions', fields, conditions);
}

module.exports = TutorSessionModel;
