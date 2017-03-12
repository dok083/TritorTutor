"use strict"
/**
 * Handles the messaging system between the users, and generates automated
 * messages when tutors are requested
 */

var MessageController = require('../../controller/messageController.js');
var ProfileController = require('../../controller/profileController.js');
var TutorSessionController = require('../../controller/tutorSessionController.js');
var requiresLoggedIn = require('../userUtils.js');

/**
 * Gets the contents of a specific message for a user.
 */
function viewMessage(req, res, user) {
    // Get the message ID.
    var messageID = parseInt(req.params.id);

    if (!messageID || messageID < 0) {
        res.status(400).json({message: 'invalid id'});

        return;
    }

    // Get details about the message.
    MessageController.getByMID(messageID)
        .then((message) => {
            // Make sure only the recipient can read the message.
            if (message.recipient != user.userID) {
                res.status(403).json({message: 'not allowed'});

                return;
            }

            // Get information about the user who sent the message.
            ProfileController.get(message.sender)
                .then((sender) => {
                    res.json({
                        sender: sender,
                        title: message.title,
                        content: message.content
                    });
                });
        });
}

/**
 * Deletes a message from a specific user.
 */
function deleteMessage(req, res, user) {
    // Get the message ID.
    var messageID = parseInt(req.params.id);

    if (!messageID || messageID < 0) {
        res.status(400).json({message: 'invalid id'});

        return;
    }

    MessageController.getByMID(messageID)
        .then((message) => {
            if (message.recipient != user.userID) {
                res.status(403).json({message: 'not allowed'});

                return;
            }

            MessageController.deleteByMID(messageID);
            res.json({message: 'success'});
        });
}

/**
 * Retrieves all messages for a user.
 */
function getMessages(req, res, user) {
    MessageController.getByUID(user.userID)
        .then((results) => {
            res.json(results);
        });
}

/**
 *  Send message for a user
 */
function sendMessage(req, res, user) {
    // Get who the message should be sent to.
    var recipientID = parseInt(req.params.id);

    if (!recipientID || recipientID < 1) {
        return res.status(400).json({message: 'You have provided an invalid recipient.'});
    }

    // Get the details for the message.
    var subject = req.body.subject;
    var content = req.body.content;

    if (!subject || !content || subject.length == 0 || content.length == 0) {
        return res.status(400).json({message: 'The subject and message cannot be blank.'});
    }

    // Check if we are currently tutoring for this person.
    TutorSessionController.getPair(user.userID, recipientID)
        .then((session) => {
            if (!session) {
                res.status(400).json({message: 'You are not allowed to message this user.'});
            }

            // Send the message if allowed.
            MessageController.send(user.userID, recipientID, subject, content)
                .then(() => {
                    res.json({message: 'success'});
                });
        });
}

module.exports = {
    '/:id': {
        get: requiresLoggedIn(viewMessage),
        delete: requiresLoggedIn(deleteMessage),
        post: requiresLoggedIn(sendMessage)
    },
    '/': {
        get: requiresLoggedIn(getMessages)
    }
}
