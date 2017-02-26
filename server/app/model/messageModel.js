var MessageModel = {}

/**
 * Creates a new message sent from the sender (a user ID) to the recipient
 * (another user ID) with the given subject and message.
 *
 * @param sender The user that sent the message.
 * @param recipient The user that should receive the email.
 * @param subject The subject title for the message.
 * @param message What the message contains.
 * @return A promise that is called after the message has been made. The
 *         parameter is the ID of the message.
 */
MessageModel.create = function(sender, recipient, subject, message) {
    // TODO: Implement
}

/**
 * Permanently deletes a message.
 * 
 * @param id The ID for the desired message.
 * @return A promise that is called after the message has been deleted.
 */
MessageModel.deleteMessage = function(id) {
    // TODO: Implement   
}

/**
 * Deletes all messages that have been sent to the desired user.
 *
 * @param userID The desired user.
 * @return A promise that is called after all messages are deleted.
 */
MessageModel.deleteUser = function(userID) {
    // TODO: Implement
}

/**
 * Gets a desired message from the given message ID.
 *
 * @param id The ID for the message.
 * @return A promise that contains the desired message
 */
MessageModel.readMessage = function(id) {
    // TODO: Implement
}

/**
 * Gets all the messages that have been sent to a desired user.
 *
 * @param userID The ID of the user to retrieve messages for.
 * @return A promise that contains a list of all the messages for a user.
 */
MessageModel.readUser = function(userID) {
    // TODO: Implement
}

module.exports = MessageModel;
