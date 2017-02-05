var user = require('../lib/user.js');

module.exports = {
    '/:userID': {
        get: function(req, res) {
            var userID = req.params.userID;

            user.checkVerifiedByID(userID)
                .then((verified) => {
                    res.json({status: verified});
                });
        }
    }
}
