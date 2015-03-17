'use strict';

var DataStore = require('../stores/DataStore');

module.exports = function (context, payload, done) {
    var dataStore = context.getStore(DataStore);
    if (dataStore.getState().data === null) {
        context.service.read('data', {}, {}, function (err, data) {
            context.dispatch('RECEIVE_DATA', data);
            done();
        });
    } else {
        done();
    }
};
