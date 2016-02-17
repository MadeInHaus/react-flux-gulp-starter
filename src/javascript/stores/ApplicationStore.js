import BaseStore from 'fluxible/addons/BaseStore';

class ApplicationStore extends BaseStore {

    static storeName = 'ApplicationStore';

    static handlers = {
        DO_STUFF: 'onDoStuff',
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.stuff = null;
    }

    onDoStuff(stuff) {
        this.stuff = stuff;
        this.emitChange();
    }

    getState() {
        return {
            stuff: this.stuff,
        };
    }

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.stuff = state.stuff;
    }

}

export default ApplicationStore;
