// Inspired by
// http://fluxible.io/tutorials/routing.html
// https://github.com/yahoo/flux-examples/tree/master/react-router
require('babel/register');

var express = require('express');
var expressState = require('express-state');
var debug = require('debug')('Server');
var React = require('react');
var provideContext = require('fluxible-addons-react').provideContext;
var app = require('./src/javascript/app');
var Html = require('./src/javascript/components/Html.jsx');
var navigateAction = require('./src/javascript/actions/navigate');

//Routing
var createLocation = require('history/lib/createLocation');
var Router = require('react-router');
var RoutingContext = Router.RoutingContext;
var match = Router.match;
var Routes = require('./src/javascript/components/Routes.jsx');

var server = express();

expressState.extend(server);

server.use('/', express.static(__dirname + '/build'));

server.use(function (req, res, next) {
    var location = createLocation(req.url);

    var context = app.createContext({
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

    match({
        routes: Routes,
        location: location
    }, function (error, redirectLocation, renderProps) {

        if (redirectLocation) {
            res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            res.send(500, error.message);
        } else if (renderProps === null) {
            res.send(404, 'Not found');
        } else {
            context.executeAction(navigateAction, location, function (err) {

                var appState = app.dehydrate(context);
                appState.env = process.env.NODE_ENV || 'local';
                res.expose(appState, 'App');

                renderProps.context = context.getComponentContext();

                var RouterComponent = provideContext(RoutingContext, app.customContexts);

                var HtmlComponent = provideContext(Html, app.customContexts);

                var markup = React.renderToString(React.createElement(
                    RouterComponent, renderProps));

                var html = React.renderToStaticMarkup(React.createElement(
                    HtmlComponent, {
                        context: context.getComponentContext(),
                        state: res.locals.state,
                        markup: markup,
                        location: location
                    })
                );

                res.send('<!doctype html>' + html);
            });
        }
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
debug('Listening on port ' + port);
