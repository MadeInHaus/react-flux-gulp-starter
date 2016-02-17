
export default function doStuff(actionContext, payload, done) {
    actionContext.dispatch('DO_STUFF', payload);
    done();
}
