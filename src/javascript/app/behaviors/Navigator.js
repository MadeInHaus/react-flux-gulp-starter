var app = require('../app'),
    $ = require('jquery'),
    channels = require('../channels'),
    Marionette = require('backbone.marionette');

module.exports = app.Behaviors['Navigator'] = Marionette.Behavior.extend({

    ui: {
        links: '[data-navigate], a[href^="/"]'
    },

    events: {
        'click @ui.links': 'onClickNavigate'
    },

    onClickNavigate: function(e) {
        e.preventDefault();
        var url = $(e.currentTarget).data('navigate') || $(e.currentTarget).attr('href');
        this.onNavigate(url);
    },

    onNavigate: function(url) {
        channels.globalChannel.trigger('navigate', {
            route: url,
            triggerStatus: true
        });
    }

});
