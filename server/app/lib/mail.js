/**
 * This file sets up the mail system for the Tritor platform.
 * This allows for e-mails to be sent to users.
 */

// Get mail credentials.
var config = require('../../config/server.json');

var username = config.gmailUsername;
var password = config.gmailPassword;

// Set up nodemailer.
var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport('smtps://'
                                             + username + '%40gmail.com:'
                                             + password
                                             + '@smtp.gmail.com');

/**
 * Sends an e-mail from the Tritor mail account to the given e-mail address.
 * The subject and body can be set for the e-mail. After it has been sent,
 * callback is called.
 *
 * @param email The e-mail address of the recipient.
 * @param subect The subject of the e-mail.
 * @param message The message of the e-mail.
 * @param callback A function that gets called after the message has been sent.
 *        If the message was sent successfully, it has no parameters. Otherwise,
 *        the parameter is an error message for why there was an issue.
 */
module.exports = function(email, subject, message, callback) {
    // Get options for the e-mail being sent.
    var options = {
        from: '"Tritor" <' + username + '@gmail.com>',
        to: email,
        subject: subject,
        html: message
    };

    // Send an e-mail with the above options.
    transporter.sendMail(options, function(error, info) {
        if (error && callback) {
            callback(error);
        } else if (callback) {
            callback();
        }
    });
}