'use strict';

var _ = require('lodash');
var createStore = require('fluxible/utils/createStore');

var ApplicationStore = createStore({

    storeName: 'ApplicationStore',

    handlers: {
        'CHANGE_ROUTE': 'onChangeRoute'
    },

    initialize: function () {
        this.currentRoute = null;
    },

    onChangeRoute: function (route) {
        if (this.currentRoute && route.path === this.currentRoute.path) {
            return;
        }
        this.currentRoute = _.omit(route, 'routes');
        this.emitChange();
    },

    getState: function () {
        return {
            route: this.currentRoute
        };
    },

    dehydrate: function () {
        return this.getState();
    },

    rehydrate: function (state) {
        this.currentRoute = state.route;
    }

});


module.exports = ApplicationStore;
