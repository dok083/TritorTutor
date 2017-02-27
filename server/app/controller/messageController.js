"use strict"

/**
 * The MessageController class is responsible for creating, deleting, and
 * accessing messages.
 */

var MessageModel = require('../model/messageModel.js');

var ModelController = {};

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
    return MessageModel.readUser(userID).then(
        (results) => {
            // to hold each message
            var msgList = [];

            if (results && results.length > 0){
                // construct and return list of messages 
                return results.map((result) => {
                    // add this message to the list
                    return {
                        sender: result.sender,
                        recipient: result.receiver,
                        title: result.title,
                        content: result.content
                    };
                })
            }
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
    // TODO retrieve data of message with msgID
    // TODO construct a message for this message
    // TODO construct and return promise containing message
}

/**
 * Removes all of the messages associated with the given UID.
 *
 * @param user UID of messages to delete
 *
 * @return empty promise
 */
MessageController.delete = function(userID) {
    // TODO delete data of all messages with userID
    // TODO construct and return empty promise
}

/**
 * Removes the message associated with the given MID.
 *
 * @param msgID MID of message to delete
 *
 * @return empty promise
 */
MessageController.delete = function(msgID) {
    // TODO delete data of message with msgID
    // TODO construct and return empty promise
}

module.exports = MessageController;
