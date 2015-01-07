    var app = require('../app'),
        $ = require('jquery'),
        channels = require('../channels'),
        constants = require('../utils/constants'),
        Marionette = require('backbone.marionette');

    module.exports = app.Behaviors['Test'] = Marionette.Behavior.extend({

        ui: {
        },

        initialize: function() {
            console.log('View using Test Behavior');
        }

    });
