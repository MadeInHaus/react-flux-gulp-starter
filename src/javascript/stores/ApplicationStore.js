'use strict';

import _ from 'lodash';
import BaseStore from 'fluxible/addons/BaseStore';

class ApplicationStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.currentRoute = null;
    }

    onChangeRoute(route) {
        if (this.currentRoute && route.path === this.currentRoute.path) {
            return;
        }
        this.currentRoute = _.omit(route, 'routes');
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
