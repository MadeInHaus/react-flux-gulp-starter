'use strict';

var createStore = require('fluxible/utils/createStore');

var DataStore = createStore({

    storeName: 'DataStore',

    handlers: {
        'RECEIVE_DATA': 'onReceiveData'
    },

    initialize: function () {
        this.data = null;
    },

    onReceiveData: function (data) {
        this.data = data;
        this.emitChange();
    },

    getState: function () {
        return {
            data: this.data
        };
    },

    dehydrate: function () {
        return this.getState();
    },

    rehydrate: function (state) {
        this.data = state.data;
    }

});


module.exports = DataStore;
