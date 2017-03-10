"use strict"
/**
 * Handles the messaging system between the users, and generates automated
 * messages when tutors are requested
 */

var MessageController = require('../../controller/messageController.js');
var ProfileController = require('../../controller/profileController.js');
var requiresLoggedIn = require('../userUtils.js');

/**
 * Sends a reply to a certain message.
 */
function replyToMessage(req, res, user) {
    // Make sure the user is verified first.
    if (!user.verified) {
        res.status(400).json({message: 'not verified'});

        return;
    }

    console.log(req.body)
    const msgID = parseInt(req.body.id);
    const content = req.body.content;

    // Make sure the user is allowed to access this message.
    if (!msgID || msgID < 0) {
        res.status(400).json({message: 'The message you are replying to does not exist.'});

        return;
    }

    // Make sure we are sending a message.
    if (!content || content.length == 0) {
        res.status(400).json({message: 'Your reply cannot be empty.'});
    }

    // Get which message that user wants to reply to.
    MessageController.getByMID(msgID)
        .then((message) => {
            // Make sure the user can reply to the message.
            if (!message || message.recipient != user.userID) {
                res.status(400).json({message: 'You are not allowed to this message.'});
            }

            // Send the reply back to the sender.
            MessageController.send(user.userID, message.sender,
                                   'RE: ' + message.title, content).then(() => {
                res.json({message: 'success'});
            });
        });
}

module.exports = {
    '/reply': {
        post: requiresLoggedIn(replyToMessage)
    }
}
