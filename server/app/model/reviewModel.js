"use strict"

/**
 * The ReviewModel class is a data access object that allows for storing and
 * retrieval of reviews in the Tritor database.
 */

var ReviewModel = {};

var db = require('./database.js');


/**
 * Creates a new review in the database for the user whose ID is userID from the
 * user whose ID is reviewerID.
 *
 * @param userID The ID of the user giving the review.
 * @param tutorID The ID of the user being reviewed.
 * @param rating The number of stars 0-5 inclusive for the review.
 * @param comment A comment for the review.
 * @return A promise that is called after the review has been made.
 */
ReviewModel.create = function(tutorID, userID, rating, comment) {
    //add review and update it if user already wrote a review
    return db.query('INSERT INTO tritor_reviews(userID, reviewerID, rating, comment) VALUES(?, ?, ?, ?) ON DUPLICATE KEY UPDATE rating = ?, comment = ?',
		    [tutorID, userID, rating, comment, rating, comment]);
}

/**
 * Returns a list of reviews from the database for the user whose ID is userID.
 *
 * @param userID The ID of the desired user.
 * @return A promise that contains a list of reviews for the use.r
 */
ReviewModel.get = function(userID) {
    return db.select('tritor_reviews', ['userID', 'rating', 'comment'],
                     'tutorID=' + userID);
}

/**
 * Returns the avg of the reviews rating from the database for the user whose ID is userID.
 *
 * @param userID The ID of the desired user.
 * @return A promise that contains a float that is the avg rating for the user
 */
ReviewModel.getAvg = function(userID) {
    return db.query('SELECT AVG(rating) FROM tritor_reviews WHERE tutorID = ?', [userID]);
}

/**
 * Updates the fields of a specific review in the database. The review is the
 * review given to the user whose ID is userID from the user whose ID is
 * reviewerID.
 *
 * @param tutorID - The ID of the tutor that was reviewed.
 * @param userID - The ID of the user that gave the review.
 * @param values - What to update some fields of the review to.
 * @return A promise that is called after the review is updated.
 */
ReviewModel.update = function(tutorID, userID, values) {
    return db.update('tritor_reviews', values,
                     'tutorID=' + userID + ' AND userID='+userID, 1);
}

module.exports = ReviewModel;
