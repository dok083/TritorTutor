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
TutorSessionModel.create = function(tutorID, studentID, classID, status) {
    return db.insert('tritor_tutor_sessions', {
        tutorID: tutorID,
        studentID: studentID,
        classID: classID,
        status: status,
    }).then((results) => {
        return results.insertId;
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
    tutorID = db.escape(tutorID);
    studentID = db.escape(studentID);
    classID = db.escape(classID);

    var conditions = 'tutorID=' + tutorID + 'AND studentID=' + studentID
                     + 'AND classID=' + classID;

    return db.update('tritor_tutor_sessions', data, conditions, 1);
}

/**
 * Returns a specific tutor session from a given session ID.
 * 
 * @param sessionID The ID for the tutoring session.
 * @return A promise containing the session corresponding to the given ID. If no
 *         session was found, the promise contains null.
 */
TutorSessionModel.getByID = function(sessionID) {
    const fields = ['tutorID', 'studentID', 'classID', 'status'];

    return db.select('tritor_tutor_sessions', fields,
                     'sessionID=' + db.escape(sessionID)).then((results) => {
        if (results.length > 0) {
            return results[0];
        } else {
            return null;
        }
    });
}

/**
 * Returns all tutoring sessions where the user being tutored corresponds to the
 * given user ID.
 *
 * @param userID The ID of the user being tutored.
 * @return A promise containing a list of matching tutoring sessions.
 */
TutorSessionModel.getByStudent = function(userID) {
    const fields = ['sessionID', 'tutorID', 'classID', 'status'];

    return db.select('tritor_tutor_sessions', fields,
                     'studentID=' + db.escape(userID)).then((results) => {
        return results.map((session) => {
            session.studentID = userID;

            return session;
        })
    });
}

/**
 * Returns all tutoring sessions where the tutor corresponds to the given
 * user ID.
 *
 * @param userID The user ID of the tutor.
 * @return A promise containing a list of matching tutoring sessions.
 */
TutorSessionModel.getByTutor = function(userID) {
    const fields = ['sessionID', 'studentID', 'classID', 'status'];

    return db.select('tritor_tutor_sessions', fields,
                     'tutorID=' + db.escape(userID)).then((results) => {
        return results.map((session) => {
            session.tutorID = userID;

            return session;
        });
    });
}

/**
 * Returns all of the tutoring sessions that were between a student
 * corresponding to the given studentID and a tutor corresponding to the
 * given tutorID. A class may be provided as well.
 *
 * @param studentID The user ID of the desired student.
 * @param tutorID The user ID of the desired tutor.
 * @param classID An optional ID for a class.
 * @return A promise that contains a list of all matching tutoring sessions.
 */
TutorSessionModel.getBetween = function(studentID, tutorID, classID) {
    const fields = ['sessionID', 'classID', 'status'];
    const conditions = 'studentID=' + db.escape(studentID)
                       + ' AND tutorID=' + db.escape(tutorID);

    if (classID) {
        conditions += ' AND classID=' + db.escape(classID);
    }

    return db.select('tritor_tutor_sessions', fields, conditions)
        .then((results) => {
            return results.map((session) => {
                session.studentID = studentID;
                session.tutorID = tutorID;

                return session;
            });            
        });
}


module.exports = TutorSessionModel;