"use strict"

/**
 * This file is responsible for getting the top 10 tutors.
 */
console.log('aaaa')
var TutorController = require('../../controller/tutorController.js');

/**
 * Get the top tutors for the course.
 */
function getPopular(req, res) {
    return TutorController.getPopular()
        .then((results) => {
            res.json(results);
        });
}

module.exports = {
    '/': {get: getPopular}
}
