"use strict"

/**
 * This file handles tutor listings.
 */

var TutorController = require('../../controller/tutorController.js');
var CourseController = require('../../controller/courseController.js');
var requiresLoggedIn = require('../userUtils.js');

/**
 * Returns the tutoring information for the current user for the given course.
 */
function getTutorInfo(req, res, user) {
 	var courseID = req.params.id;

 	if (!courseID || courseID.length < 3) {
 		return res.status(400).json({message: 'invalid course'});
 	}

    TutorController.getByUser(user.userID, courseID.toUpperCase())
        .then((info) => {
        res.json(info);
    });
}

/**
 * Updates tutor listing when a new listing is made or deleted 
 * for a certain course
 */
function updateTutors(req, res, user) {
    if (!user.verified) {
        return res.status(403).json({message: 'not verified'});
    }

    const courseID = req.params.id;
    const data = req.body.data;

    // Validate user changes. Expect an object containing changes.
    // Error if the changes are not valid.

    // Create a new change object that contains verified values. Add the
    // values from the original changes to the new object with fixed values if
    // needed.
    var change = {};

    // Validate the course ID, if there is one
    if ((courseID != undefined)
        && (!courseID || courseID.length < 3)) {
        return res.status(400).json({message: 'invalid course'});
    }
    else if (courseID != undefined)
    {
        change.courseID = courseID;
    }

    // Validate the price, if there is one
    if ((data.price != undefined)
        && (!data.price || data.price < 0)) {
        return res.status(400).json({message: 'invalid price'});
    }
    else if (data.price != undefined)
    {
        change.price = data.price;
    }

    // Validate the negotiable, if there is one
    if (data.negotiable != undefined) {
        return res.status(400).json({message: 'invalid negotiable'});
    }
    else if (data.negotiable != undefined)
    {
        change.negotiable = data.negotiable;
    }

    // Change the description, if there is one
    if (data.description != undefined)
    {
        change.description = data.description;
    }

    // Check the given tutor for the given course actually exists.
    TutorController.getByUser(user.userID, courseID)
        .then(
        (listing) => 
        {
            // validate that a listing for this tutor alrady exists
            if (listing == null) {
                return res.status(400).json({message: 'invalid user-course combination'});
            }

            // Update the tutor listing for the user.
            TutorController.update(courseID, user.userID, change)
                .then(
                () => {
                    console.log('woo')
                    res.json({message: 'success'});
                })
                .catch((error) => {
                    res.status(400).json({message: error.toString()});
                });
        });

}

/**
 * Adds a new tutor listing for the given course.
 */
function addTutor(req, res, user) {
    // Make sure the user is verified.
    if (!user.verified) {
        return res.status(403).json({message: 'not verified'});
    }

    var courseID = req.params.id;
    var desc = req.body.desc;
    var price = parseFloat(req.body.price);
    var nego = req.body.nego;

    // Validate the course ID.
    if (!courseID || courseID.length < 3) {
        return res.status(400).json({message: 'invalid course'});
    }

    // Validae the price.
    if (!price || price < 0) {
        return res.status(400).json({message: 'invalid price'});
    }

    // Convert negotiable to a boolean type.
    if (!nego) {
        nego = false;
    } else {
        nego = true;
    }

    // Convert desc to a string type.
    if (!desc) {
        desc = '';
    } else {
        desc = desc.toString();
    }

    // Limit price to two decimal places.
    price = price.toFixed(2);

    // Check the given course actually exists.
    CourseController.getCourseInfo(courseID.toUpperCase())
        .then((course) => {
            if (!course) {
                return res.status(400).json({message: 'invalid course'});
            }

            // If it does exist, add the tutor.
            TutorController.add(courseID, user.userID, desc, price, nego)
                .then(() => {
                    console.log('woo')
                    res.json({message: 'success'});
                })
                .catch((error) => {
                    res.status(400).json({message: error.toString()});
                });
        });
}

function deleteTutor(req, res, use) {
    var courseID = req.params.id;

    if (!courseID || !userID) {
        return res.status(400).json({message: 'listing not found'});
    }

    TutorController.remove(courseID, userID)
        .then();
}

 module.exports = {
 	'/:id':  {
 		get: requiresLoggedIn(getTutorInfo),
 		put: requiresLoggedIn(updateTutors),
        post: requiresLoggedIn(addTutor),
        delete: requiresLoggedIn(deleteTutor)
 	} 
 };
