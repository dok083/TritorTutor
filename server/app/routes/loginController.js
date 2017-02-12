'use strict'

var UserFormValidator = require('./userFormValidator.js');
var UserAccountModel = require('../model/userAccountModel.js');
var SessionModel = require('./sessionModel.js');
var UserFormValidator = require('./userFormValidator.js');


var LoginController = {};

/* Logs in to an existing account
 */
LoginController.login = function(req, res) {
	var inputEmail = req.body.email;
	var inputPass = req.body.password;

	VerificationModel.getByCredentials(inputEmail, inputPass)
}