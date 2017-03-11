/**
 * This view allows users to get a review for a desired user.
 */

"use strict"

var ReviewController = require('../../controller/reviewController.js');
var requiresLoggedIn = require('../userUtils.js');

function getReviews(req, res) {
    var userID = parseInt(req.params.userID);

    // Make sure the user ID is valid.
    if (userID < 1) {
        res.status(422).json({message: "invalid user ID"});

        return;
    }

    // Return the reviews for the given user.
    ReviewController.get(userID)
        .then((reviews) => {
            res.json(reviews); 
        });
}

function addReviews(req, res, user) {
    if (!user.verified) {
	return res.status(403).json({message: 'You are not verified'});
    }

    var userID = parseInt(req.params.userID);
    var rating = parseInt(req.body.rating);
    var comment = req.body.comment;

    if (!userID.verified) {
        return res.status(403).json({message: 'Profile does not exist'});
    }

    if (!content || content.length == 0) {
        res.status(400).json({message: 'Your reply cannot be empty.'});
    }

   ReviewController.add(userID, user, rating, comment)
	.then(() => {
	    res.json({message: 'success'});
	});
}

module.exports = {
    '/:userID': {
        get: getReviews,
	post: requiresLoggedIn(addReviews)
    }
};
