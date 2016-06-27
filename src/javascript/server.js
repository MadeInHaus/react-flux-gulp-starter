// Utils
import _ from 'lodash';
import path from 'path';
import d from 'debug';

// Express
import express from 'express';
import expressState from 'express-state';
import compression from 'compression';

// React / App-level
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { provideContext } from 'fluxible-addons-react';
import app from './app';
import Html from 'components/Html.jsx';

// Routing
import { RouterContext, match } from 'react-router';
import routes from 'components/Routes.jsx';
import { createMemoryHistory } from 'react-router';

// Middleware
import inlineStyles from 'middleware/inlineStyles';

import fetchRouteData from 'utils/fetchRouteData';

const debug = d('Server');

const server = express();

expressState.extend(server);

server.use(compression());

// proxy webpack dev server assets
if(process.env.NODE_ENV === 'development'){
    const httpProxy = require('http-proxy');
    const proxy = httpProxy.createProxyServer();
    server.all('/js/*', (req, res, next) => {

        let _break = false;
        ['modernizr'].forEach(exclude => {
            if(req.url.includes(exclude)) _break = true;
        });

        if(_break) return next();

        proxy.web(req, res, {
            target: 'http://0.0.0.0:8080'
        });
        return;
    });
    proxy.on('error', (e) => {
        console.log(`There was an error while connecting to the webpack dev server proxy. ${e}`);
    });
}

server.use('/', express.static(path.resolve('./build')));
server.use(inlineStyles('./build/css/inline.css'));

server.use((req, res) => {
    const location = createMemoryHistory().createLocation(req.url);
    const context = app.createContext({
        env: process.env.NODE_ENV || 'local',
        siteUrl: process.env.SITE_URL || `${req.protocol}://${req.hostname}`,
        // Uncomment this code to specify where on S3 remote assets are stored
        // aws: {
        //     useS3: process.env.USE_S3 && process.env.USE_S3 !== 'false' || false,
        //     bucket: process.env.S3_BUCKET || 'madeinhaus',
        //     prefix: process.env.S3_PREFIX || 'react-flux-gulp-starter',
        //     folder: process.env.S3_PATH || process.env.NODE_ENV || false,
        //     urlHash: process.env.URL_HASH || false,
        //     cloudfront: process.env.CLOUDFRONT_URL || false,
        //     bypassCdn: req.query.bypass || false,
        // },
    });

    match({ routes, location }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
            res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            res.status(500).send(error.message);
        } else {
            if (_.last(renderProps.routes).isNotFound) {
                res.status(404);
            }
            fetchRouteData(context, renderProps)
                .then(() => {
                    const appState = app.dehydrate(context);
                    appState.env = process.env.NODE_ENV || 'local';
                    res.expose(appState, 'App');

                    const props = Object.assign(
                                        {},
                                        renderProps,
                                        {
                                            context: context.getComponentContext(),
                                            key: Date.now()
                                        }
                                    );

                    const RouterComponent = provideContext(RouterContext, app.customContexts);
                    const HtmlComponent = provideContext(Html, app.customContexts);

                    const html =
                        ReactDOMServer.renderToStaticMarkup(
                            React.createElement(HtmlComponent, {
                                title: 'react-flux-gulp-starter - madeinhaus.com',
                                context: context.getComponentContext(),
                                state: res.locals.state,
                                children: [React.createElement(RouterComponent, props)],
                                location,
                            }
                        ));
                    res.send(`<!DOCTYPE html>${html}`);
                })
                .catch(err => {
                    res.status(500).send(err.stack);
                });
        }
    });
});

const port = process.env.PORT || 3000;
const instance = server.listen(port, () => {
    debug(`Listening on port ${port}`);

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
