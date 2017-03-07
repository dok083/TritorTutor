"use strict"

/**
 * This is responsible for allowing users to have their verification email
 * resent.
 */

var controller = '../../controller/';
var VerificationController = require(controller + 'verificationController.js');
var requireLoggedIn = require('../userUtils.js');

/**
 * Resends the verification email for the given email.
 */
function resend(req, res, user) {
  VerificationController.check(user)
      .then((verified) => {
        if (verified) {
          res.status(400).json({message: 'already verified'});
        } else {
          VerificationController.begin(user);
          res.json({message: 'okay'});
        }
      });
}

module.exports = {
    '/resend': {post: requireLoggedIn(resend)}
};
