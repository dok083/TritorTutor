"use strict"

/**
 * The MessageController class is responsible for creating, deleting, and
 * accessing messages.
 */

var MessageModel = require('../model/messageModel.js');
var ProfileModel = require('../model/profileModel.js');

var MessageController = {};

/**
 * Creates a new message with the given sender and recipient UIDs and message
 * subject and content.
 *
 * @param sender the UID of the message sender
 * @param recipient the UID of the message recipient
 * @param title the title of the message
 * @param content the content of the message
 *
 * @return promise containing MID
 */
MessageController.send = function(sender, recipient, title, content)
{
    // update database with sender, recipient, title, content and make database 
    // generate MID for this message; return the promise containing MID
    return MessageModel.create(sender, recipient, title, content);
}

/**
 * Returns a list of all of the messages associated with the given UID.
 *
 * @param user UID of messages to return
 *
 * @return promise containing a list of the messages associated with the given
 * UID.
 */
MessageController.getByUID = function(userID) {
    // retrieve data of all messages with userID
    return new Promise(function(resolve, reject) {
        MessageModel.readUser(userID).then(
        (results) => {
            // Do nothing if there are no messages to handle.
            if (results.length == 0) {
                resolve([]);

                return;
            }

            var messages = [];
            var done = 0;

            // Load the sender for each message.
            for (var i = 0; i < results.length; i++) {
                const result = results[i];

                ProfileModel.get(result.sender)
                    .then((sender) => {
                        // Add the message with the user to the message list.
                        messages.push({
                            id: result.msgID,
                            sender: sender,
                            title: result.title,
                            time: result.creationTime,
                            content: result.content
                        });

                        done++;

                        // If we finished the last one, resolve the promise.
                        if (done == results.length) {
                            resolve(messages);
                        }
                    });
            }
        });
    });
}

/**
 * Returns a list of all of the messages associated with the given MID.
 *
 * @param msgID MID of message to return
 *
 * @return promise containing the message associated with the given MID.
 */
MessageController.getByMID = function(msgID) {
    // retrieve data of message with msgID and construct and return promise
    // containing message
    return MessageModel.readMessage(msgID).then(
        (results) => {
            // a message was found at this MID
            if (results && results.length == 1) {
                // construct and return a message for this message
                return {
                        sender: results[0].sender,
                        recipient: results[0].receiver,
                        title: results[0].title,
                        content: results[0].content
                };
            }
            // message not found
            return null;
        } );
}

/**
 * Removes all of the messages associated with the given UID.
 *
 * @param user UID of messages to delete
 *
 * @return empty promise
 */
MessageController.deleteByUID = function(userID) {
    // delete data of all messages with userID and return promise
    return MessageModel.deleteUser(userID);
}

/**
 * Removes the message associated with the given MID.
 *
 * @param msgID MID of message to delete
 *
 * @return empty promise
 */
MessageController.deleteByMID = function(msgID) {
    // delete data of all messages with userID and return promise
    return MessageModel.deleteMessage(msgID);
}

module.exports = MessageController;
