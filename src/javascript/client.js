'use strict';

var React = require('react');
var Router = require('react-router');
var debugMain = require('debug');
var debug = debugMain('App');
var app = require('./app');
var navigateAction = require('./actions/navigate');
var firstRender = true;

debugMain.enable('App, Fluxible, Fluxible:*');

function renderApp(context, Handler) {
    debug('React Rendering');
    var HandlerComponent = React.createFactory(Handler);
    var componentContext = context.getComponentContext();
    var localeStoreState = componentContext.getStore('LocaleStore').getState();
    React.render(
        HandlerComponent({
            context: componentContext,
            locales: localeStoreState.locales,
            formats: localeStoreState.formats,
            messages: localeStoreState.messages
        }),
        document.getElementById('app'),
        function renderAppComplete() {
            debug('React Rendered');
        }
    );
}

debug('Rehydrating..');

app.rehydrate(window.App, function (err, context) {
    if (err) { throw err; }
    Router.run(app.getComponent(), Router.HistoryLocation, function (Handler, state) {
        if (firstRender) {
            // Don't call the action on the first render on top of the server rehydration
            // Otherwise there is a race condition where the action gets executed before
            // render has been called, which can cause the checksum to fail.
            firstRender = false;
            renderApp(context, Handler);
        } else {
            context.executeAction(navigateAction, state, function () {
                renderApp(context, Handler);
            });
        }
    });
});
