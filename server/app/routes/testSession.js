"use strict"

var user = require('../lib/user.js');

module.exports = {
    '/:userID': {
        get: function(req, res) {
            var userID = req.params.userID;

            user.findByID(userID).then((foundUser) => {
                if (foundUser) {
                    user.createSession(userID).then((token) => {
                        res.json({token: token});
                    });
                } else {
                    res.json({error: 'user not found'});
                }
            });
        }
    }
}
