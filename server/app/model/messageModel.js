var MessageModel = {}

/**
 * Creates a new message sent from the sender (a user ID) to the recipient
 * (another user ID) with the given title and message.
 *
 * @param sender The user that sent the message.
 * @param recipient The user that should receive the email.
 * @param title The title title for the message.
 * @param content What the message contains.
 * @return A promise that is called after the message has been made. The
 *         parameter is the ID of the message.
 */
MessageModel.create = function(sender, recipient, title, content) {
    // the current timestamp
    var timeStamp = Math.floor(Date.now() / 1000);

    // add the data of this message to the database
    return db.insert('tritor_messages', {
        sender: sender,
        title: title,
        creationTime: timeStamp
        receiver: recipient,
        content: content
    }).then((results) => {
        // return the MID
        return {
            msgID: results.insertId,
        }
    });
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
 * @param msgID The ID for the message.
 * @return A promise that contains the desired message
 */
MessageModel.readMessage = function(msgID) {
// condition to check to find user with matching msgID
var conditions = 'msgID=' + msgID;

// return promise containing information about message
return db.select('tritor_messages', ['sender','title','receiver','content'], 
    conditions, 1, 'creationTime DSC')
}

/**
* Gets all the messages that have been sent to a desired user.
*
* @param userID The ID of the user to retrieve messages for.
* @return A promise that contains a list of all the messages for a user.
*/
MessageModel.readUser = function(userID) {
// condition to check to find user with matching userID
var conditions = 'receiver=' + userID;

// return promise containing information about messages
return db.select('tritor_messages', ['sender','title','receiver','content'], 
    conditions, 50, 'creationTime DSC')
}

module.exports = MessageModel;
