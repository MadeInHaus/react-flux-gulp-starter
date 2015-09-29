'use strict';

export default function updateTime (actionContext, payload, done) {
    actionContext.dispatch('UPDATE_TIME');
    done();
}
