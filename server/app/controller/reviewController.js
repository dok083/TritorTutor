/**
 * This file contains the ReviewController class which is responsible for the
 * logic regarding tutor reviews.
 */

"use strict"

var ReviewController = {}

var ReviewModel = require('../model/reviewModel.js');
var ProfileModel = require('../model/profileModel.js');
var TutorSessionModel = require('../model/tutorSessionModel.js');

/**
 * This function adds a new review to the user that has the ID of userID. The
 * review is created by the user whose ID is reviewerID.
 *
 * @param userID The ID of the user that is being reviewed.
 * @param reviewerID The ID of the user giving the review.
 * @param rating The number of stars from 0-5 (inclusive) that will be given.
 * @param comment A comment for the user.
 * @return A promise that is called after the review is created.
 */
ReviewController.add = function(userID, reviewerID, rating, comment) {
    rating = Math.floor(rating);

    // Keep ratings within a 0-5 inclusive range.
    if (rating < 0) {
        rating = 0;
    } else if (rating > 5) {
        rating = 5;
    }
    
    //check if there is a session between the users
    return TutorSessionModel.getBetween(reviewerID, userID)
	.then ((results)=> {
	    var session;

	    for (var i = 0; i < results.length; i++) {
                var thisSession = results[i];

                if (thisSession.status == 2 && thisSession.studentID == reviewerID) {
                    session = thisSession;

                    break;
                }
            }

	    //no session between users; can't leave review
	    if (!session){
	        return false;
	    }
	    
	    //create tutor review by student
	    return ReviewModel.create(session.tutorID, session.studentID, rating, comment)
		.then (()=> {
		    console.log('created');
		    //update profile view with new review added
		    ReviewController.updateProfile(session.studentID);
		    return true;
        	});
	});

}

/**
 * This function returns all the user reviews given to the user whose ID is
 * userID.
 *
 * @param userID The ID of the desired user.
 * @return A promise that contains the list of all reviews for the user.
 */
ReviewController.get = function(userID) {
    return new Promise(function(resolve, reject) {
        return ReviewModel.get(userID)
            .then((results) => {
                if (results.length == 0) {
                    resolve([]);

                    return;
                }

                var realResults = [];

                results.forEach((result) => {
                    var newResult = {
                        userID: result.userID,
                        stars: result.rating,
                        comment: result.comment
                    };

                    ProfileModel.get(result.userID, 'username')
                        .then((tutor) => {
                            newResult.name = tutor.username;

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
 * Gets avg of all reviews for user
 */
ReviewController.getAvg = function(userID) {
    return ReviewModel.getAvg(userID)
        .then((results) => {
            return results[0]['AVG(rating)'];
        });
}

/**
 * Updates profile to change avgRating when a review is added or updated
 */
ReviewController.updateProfile = function(userID) {
    ReviewController.getAvg(userID)
	.then((userAvg)=>{
    	    var data = {avgRating: (parseFloat(userAvg) || 0.0).toFixed(3)}
    	    return ProfileModel.updateRating(userID, data);
	});
}
//ReviewController.updateProfile(49)

/**
 * Updates a specific review (the one created by reviewerID on userID's page).
 *
 * @param userID The ID of the user that was reviewed.
 * @param reviewerID The ID of the user that gave the review.
 * @param values An object containing the fields of the review that should be
 *        updated. The object can have a rating (number from 0 to 5) or comment
 *        (a string). If the value is provided, it is updated.
 * @return A promise that is ran after the review has been updated.
 */
ReviewController.update = function(userID, reviewerID, values) {
    // Validate the rating.
    var rating = parseInt(values.rating);
    var comment = values.comment;

    // Keep the a comment a string.
    if (comment != undefined) {
        comment = comment.toString();
    }

    // Keep the rating an integer value.
    if (rating) {
        rating = Math.floor(rating);

        // Keep the rating within the rating range.
        if (rating < 0) {
            rating = 0;
        } else if (rating > 5) {
            rating = 5;
        }
    } else {
        rating = undefined;
    }

    // Update the rating with the validated input.
    return ReviewModel.update(userID, reviewerID, {
        rating: rating,
        comment: comment
    });
}

module.exports = ReviewController;
