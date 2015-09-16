'use strict';

require("babelify/polyfill");

import React from 'react';;
import Router from 'react-router';
import {FluxibleComponent} from 'fluxible-addons-react';
import app from './app';
import navigateAction from './actions/navigate';

import debug from 'debug';

var appDebug = debug('App');
var firstRender = true;

debug.enable('App, Fluxible, Fluxible:*');

appDebug('Rehydrating..');

app.rehydrate(window.App, function (err, context) {
    if (err) { throw err; }
    Router.run(app.getComponent(), Router.HistoryLocation, (Handler, state) => {
        if (firstRender) {
            // Don't call the action on the first render on top of the server rehydration
            // Otherwise there is a race condition where the action gets executed before
            // render has been called, which can cause the checksum to fail.
            firstRender = false;
            renderApp(context, Handler);
        } else {
            context.executeAction(navigateAction, state, () => {
                renderApp(context, Handler);
            });
        }
    });
});

function renderApp(context, Handler) {
    appDebug('React Rendering');
    var handlerComponent = React.createFactory(Handler);
    React.render(
        React.createElement(
            FluxibleComponent,
            { context: context.getComponentContext() },
            handlerComponent()
        ),
        document.getElementById('app'),
        () => {
            appDebug('React Rendered');
        }
    );
}
