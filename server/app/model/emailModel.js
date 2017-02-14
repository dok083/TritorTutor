/**
 * The EmailModel allows for e-mails to be sent from the Tritor e-mail.
 */

var EmailModel = {}

// Get the e-mail account information.
var config = require('../../config/server.json');

var username = config.gmailUsername;
var password = config.gmailPassword;

// Set up nodemailer.
var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport('SMTP', {
    service: 'GMail',
    auth: {
        user: username,
        pass: password
    }
});

/**
 * Sends an e-mail from the Tritor mail account to the given e-mail address.
 * The subject and body can be set for the e-mail.
 *
 * @param email The e-mail address of the recipient.
 * @param subject The subject of the e-mail.
 * @param message The message of the e-mail.
 * @return A promise that runs after the e-mail has been sent.
 */
EmailModel.send = function(email, subject, message) {
    // Specify some properties of the e-mail.
    var options = {
        from: '"Tritor" <' + username + '>',
        to: email,
        subject: subject,
        html: message
    };

    // Send an e-mail with the above options.
    return new Promise(function(resolve, reject) {
        transporter.sendMail(options, function(error, info) {
            if (error) {
                reject(error);
            } else
                resolve();
            }
        });  
    });  
}

module.exports = EmailModel;