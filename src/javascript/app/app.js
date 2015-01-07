var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');

app = new Marionette.Application();

app.addRegions({
    mainRegion: '#main-region'
});

app.Behaviors = app.Behaviors || {};

Marionette.Behaviors.behaviorsLookup = function() {
    return app.Behaviors;
};

app.addInitializer(function() {

    Backbone.history.start({
        pushState: true,
        root: '/'
    });

});

window.app = app;
module.exports = app;
