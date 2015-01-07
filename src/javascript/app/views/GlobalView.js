    var $ = require('jquery'),
        _ = require('underscore'),
        Marionette = require('backbone.marionette'),
        helpers = require('../utils/helpers'),
        channels = require('../channels'),
        constants = require('../utils/constants'),
        attachFastClick = require('fastclick');

    // View Behaviors
    require('../behaviors/Navigator');

    module.exports = Marionette.ItemView.extend({

        el: 'body',

        events: {
            'keyup': 'keyup'
        },

        behaviors: {
            Navigator: {}
        },

        initialize: function() {

            // Javascript is ready... go!
            this.$el.removeClass(constants.INITING_CLASS);

            // No click delay for iOS
            attachFastClick(document.body);

            // Force touch devices to respect :active styles in CSS
            document.addEventListener('touchstart', function() {}, true);

            // Page visibility detection
            this.listenForPageVisibility();

        },

        listenForPageVisibility: function() {

            var hidden, visibilityChange;

            if (typeof document.hidden !== 'undefined') {
                hidden = 'hidden';
                visibilityChange = 'visibilitychange';
            } else if (typeof document.mozHidden !== 'undefined') {
                hidden = 'mozHidden';
                visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.msHidden !== 'undefined') {
                hidden = 'msHidden';
                visibilityChange = 'msvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                hidden = 'webkitHidden';
                visibilityChange = 'webkitvisibilitychange';
            }

            function handleVisibilityChange() {

                if (document.hidden) {
                    console.log('document is hidden');
                } else {
                    console.log('document is showing');
                }

            }

            document.addEventListener('visibilitychange', handleVisibilityChange, false);

        }

    });
