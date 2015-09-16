'use strict';

require("babelify/polyfill");

import _ from 'lodash';

import React from 'react';
import Router from 'react-router';
import { FluxibleComponent } from 'fluxible-addons-react';
import app from './app';
import navigateAction from './actions/navigate';

import {provideContext} from 'fluxible-addons-react';

import createBrowserHistory from 'history/lib/createBrowserHistory'

import debug from 'debug';

let appDebug = debug('App');

debug.enable('App, Fluxible, Fluxible:*');

appDebug('Rehydrating...');

app.rehydrate(window.App, function (err, context) {
    if (err) {
        throw err;
    }

    renderApp(context, app);
});

function renderApp(context, app) {
    appDebug('React Rendering');

    function navigate() {
        var route = _.cloneDeep(this.state.location);
        context.executeAction(navigateAction, route);
    }

    let RouterWithContext = provideContext(Router, app.customContexts);

    React.render(
            <RouterWithContext
                context={context.getComponentContext()}
                history={createBrowserHistory()}
                routes={app.getComponent()}
                onUpdate={navigate}/>
        ,
        document.getElementById('app'), () => {
            appDebug('React Rendered');
        }
    );
}
