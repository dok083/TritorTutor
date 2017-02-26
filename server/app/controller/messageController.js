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
 * @return empty promise
 */
MessageController.send = function(sender, recipient, title, content)
{
    // TODO update database with sender, recipient, title, content
    // TODO make database generate MID for this message
    // TODO construct and return empty promise
}

/**
 * Returns a list of all of the messages associated with the given UID.
 *
 * @param user UID of messages to return
 *
 * @return promise containing a list of the messages associated with the given
 * UID.
 */
MessageController.get = function(userID) {
    // TODO retrieve data of all messages with userID
    // TODO construct a message for every message retrieved
    // TODO construct list of messages 
    // TODO construct and return promise containing list of messages
}

/**
 * Returns a list of all of the messages associated with the given MID.
 *
 * @param msgID MID of message to return
 *
 * @return promise containing the message associated with the given MID.
 */
MessageController.get = function(msgID) {
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
