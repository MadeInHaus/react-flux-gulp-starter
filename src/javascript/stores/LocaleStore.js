'use strict';

var createStore = require('fluxible/utils/createStore');

var LocaleStore = createStore({

    storeName: 'LocaleStore',

    handlers: {
        'SET_LOCALES': 'onSetLocales'
    },

    initialize: function () {
        this.locales = null;
        this.formats = {
            date: {
                standard: { day: "numeric", month: "long", year: "numeric" }
            },
            time: {
                hhmm: { hour: "numeric", minute: "numeric" },
                hhmmss: { hour: "numeric", minute: "numeric", second: "numeric" }
            }
        };
        this.messages = {
            currentTimeDate: "It's {currentTime, time, hhmmss} on {currentTime, date, standard}."
        };
    },

    onSetLocales: function (locales) {
        this.locales = locales;
        this.emitChange();
    },

    getState: function () {
        return {
            locales: this.locales,
            formats: this.formats,
            messages: this.messages
        };
    },

    dehydrate: function () {
        return this.getState();
    },

    rehydrate: function (state) {
        this.locales = state.locales;
        this.formats = state.formats;
        this.messages = state.messages;
    }

});


module.exports = LocaleStore;
