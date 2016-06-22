import { events } from 'config/constants';

export function windowSizeChange(actionContext, payload, done) {
    actionContext.dispatch(events.UPDATE_WINDOW_SIZE, payload);
    done();
}

export function breakpointUpdate(actionContext, payload, done) {
    actionContext.dispatch(events.BREAKPOINT_UPDATE, payload);
    done();
}
