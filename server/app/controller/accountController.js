"use strict"

/**
 * The AccountController class is responsible for creating and deleting user
 * accounts.
 */

var AccountController = {}

/**
 * Creates a new account with the given email, username, and password for
 * the account's credentials.
 *
 * @param email The email address of the user.
 * @param username The username for the user.
 * @param password The password for the user.
 * @return A promise that holds the user after the account has been created. If
 *         the user could not be deleted, then the promise is rejected and the
 *         reason why is thrown.
 */
AccountController.create = function(email, username, password) {

}

/**
 * Removes a user from existence using the given userID.
 *
 * @param userID The ID of the account that should be deleted.
 * @return A promise that is called after the user has been deleted.
 */
AccountController.delete = function(userID) {

}