'use strict';

var fs = require('fs');

module.exports = {

    name: 'data', // http://localhost:3001/api/resource/data

    // at least one of the CRUD methods is required
    read: function(req, resource, params, config, callback) {
        fs.readFile(__dirname + '/../../../data.json', function (err, data) {
            if (err) {
                callback(err);
            } else {
                callback(null, JSON.parse(data));
            }
        });
    },

    // create: function(req, resource, params, body, config, callback) {}
    // update: function(resource, params, body, config, callback) {},
    // delete: function(resource, params, config, callback) {}

};
