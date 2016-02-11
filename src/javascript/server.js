import d from 'debug';
import express from 'express';
import expressState from 'express-state';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {provideContext} from 'fluxible-addons-react';
import app from './app';
import Html from './components/Html.jsx';

// Routing
import {Router, RouterContext, match} from 'react-router';
import routes from './components/Routes.jsx';
import {createMemoryHistory} from 'react-router';

import fetchRouteData from './utils/fetchRouteData';

const debug = d('Server');

const server = express();

expressState.extend(server);

server.use('/', express.static(__dirname + '/../../build'));

server.use(function (req, res, next) {
    const location = createMemoryHistory().createLocation(req.url);
    const context = app.createContext({
        env: process.env.NODE_ENV || 'local',
        siteUrl: process.env.SITE_URL || req.protocol + '://' + req.hostname,
        //Uncomment this code to specify where on S3 remote assets are stored
        // aws: {
        //     bucket: process.env.S3_BUCKET || 'madeinhaus',
        //     prefix: process.env.S3_PREFIX || 'react-flux-gulp-starter',
        //     folder: process.env.S3_PATH || process.env.NODE_ENV || false,
        //     urlHash: process.env.URL_HASH || false,
        //     cloudfront: process.env.CLOUDFRONT_URL || false,
        //     bypassCdn: req.query.bypass || false
        // }
    });

    match({ routes, location }, (error, redirectLocation, renderProps) => {

        if (redirectLocation) {
            res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            res.status(500).send(error.message);
        } else if (renderProps === null) {
            res.status(404).send('Not found');
        } else {

            fetchRouteData(context, renderProps)
                .then(() => {
                    const appState = app.dehydrate(context);
                    appState.env = process.env.NODE_ENV || 'local';
                    res.expose(appState, 'App');

                    renderProps.context = context.getComponentContext();

                    const RouterComponent = provideContext(RouterContext, app.customContexts);
                    const HtmlComponent = provideContext(Html, app.customContexts);

                    const markup = ReactDOMServer.renderToString(React.createElement(RouterComponent, renderProps));
                    const html = ReactDOMServer.renderToStaticMarkup(React.createElement(HtmlComponent, {
                        title: 'react-flux-gulp-starter - madeinhaus.com',
                        context: context.getComponentContext(),
                        state: res.locals.state,
                        markup: markup,
                        location: location
                    }));

                    res.send('<!DOCTYPE html>' + html);
                })
                .catch(err => {
                    res.status(500).send(err.stack);
                });
        }
    });
});

var port = process.env.PORT || 3000;
const instance = server.listen(port, () => {
    debug('Listening on port ' + port);

    process.on('SIGTERM', () => {
        debug('Received SIGTERM, shutting down');

        instance.close(() => {
            debug('Server stopped successfully');
            process.exit(0);
        });

        setTimeout(() => {
            debug('Server didn\'t stop in top, terminating');
            process.exit(0);
        }, 9.9 * 1000);
    });
});
