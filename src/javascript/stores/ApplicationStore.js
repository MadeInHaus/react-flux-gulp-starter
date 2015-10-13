import _ from 'lodash';
import BaseStore from 'fluxible/addons/BaseStore';

class ApplicationStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.currentRoute = null;
    }

    onChangeRoute(route) {
        if (this.currentRoute && route.pathname === this.currentRoute.pathname) {
            return;
        }
        this.currentRoute = route;
        this.emitChange();
    }

    getState() {
        return {
            route: this.currentRoute
        };
    }

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.currentRoute = state.route;
    }
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
    'CHANGE_ROUTE': 'onChangeRoute'
};

export default ApplicationStore;
