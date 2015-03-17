'use strict';

var fs = require('fs');

var _data = [ 'The', 'quick', 'brown', 'fox', 'jumps', 'over', 'a', 'lazy', 'dog' ];

module.exports = {

    name: 'data',

    // at least one of the CRUD methods is required
    read: function(req, resource, params, config, callback) {
        fs.readFile(__dirname + '/../../../data.json', function (err, data) {
            if (err) {
                callback(err);
            } else {
                callback(null, JSON.parse(data));
            }
        });
        setTimeout(function () {
            //callback(null, JSON.parse(JSON.stringify(_data)));
        }, 10);
    },

    // create: function(req, resource, params, body, config, callback) {}
    // update: function(resource, params, body, config, callback) {},
    // delete: function(resource, params, config, callback) {}

};
