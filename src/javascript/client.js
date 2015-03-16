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
    var elTest = document.getElementById('test');
    var Component = React.createFactory(Handler);
    React.render(
        Component({ context: context.getComponentContext() }),
        document.getElementById('app'),
        function renderAppComplete() {
            debug('React Rendered');
            if (firstRender) {
                firstRender = false;
                debug('Isomorphic Test ' + (elTest === document.getElementById('test') ? "PASSED" : "FAILED"));
            }
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
            renderApp(context, Handler);
        } else {
            context.executeAction(navigateAction, state, function () {
                renderApp(context, Handler);
            });
        }
    });
});
