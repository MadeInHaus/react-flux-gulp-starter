'use strict';

export default function navigate (actionContext, payload, done) {
    actionContext.dispatch('CHANGE_ROUTE', payload);
    done();
}
