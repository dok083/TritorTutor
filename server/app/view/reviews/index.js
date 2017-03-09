/**
 * This view allows users to get a review for a desired user.
 */

"use strict"

var ReviewController = require('../../controller/reviewController.js');

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

module.exports = {
    '/:userID': {
        get: getReviews
    }
};
