'use strict';

module.exports = function (context, payload, done) {
    context.dispatch('UPDATE_TIME');
    done();
};
