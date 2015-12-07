import polyfill from 'babel-polyfill'; // eslint-disable-line no-unused-vars

import _ from 'lodash';
import d from 'debug';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import app from './app';
import navigateAction from './actions/navigate';
import {provideContext} from 'fluxible-addons-react';
import history from './history';

const debug = d('App');

d.enable('App, Fluxible, Fluxible:*');

debug('Rehydrating...');

function renderApp(context, app) {
    debug('React Rendering');

    function navigate() {
        var route = _.cloneDeep(this.state.location);
        context.executeAction(navigateAction, route);
    }

    let RouterWithContext = provideContext(Router, app.customContexts);

    ReactDOM.render(
        <RouterWithContext
                context={context.getComponentContext()}
                history={history}
                routes={app.getComponent()}
                onUpdate={navigate}/>,
        document.getElementById('app'), () => {
            debug('React Rendered');
        }
    );
}

debug('Rehydrating...');

app.rehydrate(window.App, function (err, context) {
    if (err) {
        throw err;
    }

    renderApp(context, app);
});
