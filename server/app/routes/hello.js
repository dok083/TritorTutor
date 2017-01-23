"use strict"

module.exports = {
    '/': {
        get: function(req, res) {
            res.json({response: 'Hello world!'});
        }
    },
    '/:name': {
        get: function(req, res) {
            res.json({response: 'Hello, ' + req.params.name + '!'});
        }
    }
};