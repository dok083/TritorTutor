"use strict"

var TutorSessionController = require('../../controller/tutorSessionController.js');
var requiresLoggedIn = require('../userUtils.js');

function getHistory(req, res, user) {

}

function updateSession(req, res, user) {

}

function createSession(req, res, user) {

}

function getSession(req, res, user) {

}

module.exports = {
	'/:id': {
		get: requiresLoggedIn(getHistory)
	},
	'/': {
		get: requiresLoggedIn(getSession),
		post: requiresLoggedIn(createSession),
		put: requiresLoggedIn(updateSession)
	}
}
