import polyfill from 'babel-polyfill'; // eslint-disable-line no-unused-vars

import _ from 'lodash';
import d from 'debug';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import app from './app';
import fetchRouteData from './utils/fetchRouteData';
import {provideContext} from 'fluxible-addons-react';
import history from './history';

const debug = d('App');

d.enable('App, Fluxible, Fluxible:*');

debug('Rehydrating...');

app.rehydrate(window.App, (err, context) => {

    let isRehydrating = true;

    if (err) {
        throw err;
    }

    debug('React Rendering');

    const RouterWithContext = provideContext(Router, app.customContexts);

    ReactDOM.render(
        <RouterWithContext
            context={context.getComponentContext()}
            history={history}
            routes={app.getComponent()}
            onUpdate={function () {
                if (isRehydrating) {
                    isRehydrating = false;
                    return;
                }
                fetchRouteData(context, this.state, err => {});
            }}
        />,
        document.getElementById('app'),
        () => { debug('React Rendered'); }
    );

});
