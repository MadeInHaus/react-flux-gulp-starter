    var app = require('../app'),
        $ = require('jquery'),
        Backbone = require('backbone'),
        Marionette = require('backbone.marionette'),
        constants = require('../utils/constants'),
        channels = require('../channels'),

        // Views
        GlobalView = require('../views/GlobalView.js'),
        BaseView = require('../views/BaseView.js');

    module.exports = Backbone.Marionette.Controller.extend({

        initialize: function() {

            // State checks
            app.onload = true;

            // Bootstrap it, gurrl
            this.bootstrap();

        },

        bootstrap: function() {
            this.globalView = new GlobalView();
            this.baseView = new BaseView();
        },

        navigate: function(options) {

            // If navigate() is being called...
            // we must be past our initial page load
            // so we'll set onload to 'false'
            app.onload = false;

            this.url = options.route;
            this.triggerStatus = options.triggerStatus;

            // Navigate, good sir!
            app.appRouter.navigate(this.url, {
                trigger: this.triggerStatus
            });

        },

        /* View Routes
        =========================================== */

        index: function() {
            console.log('AppController > index()');
        },

        home: function() {
            console.log('AppController > home()');
        },

        default: function(route) {
            console.log('%cRoute /%s does not exist', 'color:white; background:gray; padding: 0 0.25em', route);
        }

    });
