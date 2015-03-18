'use strict';

module.exports = function (actionContext, payload, done) {
    actionContext.service.read('data', {}, {}, function (err, data) {
        actionContext.dispatch('RECEIVE_DATA', data);
        actionContext.dispatch('SET_LOCALE', payload.locale);
        done();
    });
};
