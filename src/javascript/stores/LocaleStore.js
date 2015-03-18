'use strict';

var createStore = require('fluxible/utils/createStore');

var LocaleStore = createStore({

    storeName: 'LocaleStore',

    handlers: {
        'SET_LOCALE': 'onSetLocale'
    },

    initialize: function () {
        this.locale = null;
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

    onSetLocale: function (locale) {
        this.locale = locale;
        this.emitChange();
    },

    getState: function () {
        return {
            locales: this.locale,
            formats: this.formats,
            messages: this.messages
        };
    },

    dehydrate: function () {
        return this.getState();
    },

    rehydrate: function (state) {
        this.locale = state.locale;
        this.formats = state.formats;
        this.messages = state.messages;
    }

});


module.exports = LocaleStore;
