// Inspired by
// http://fluxible.io/tutorials/routing.html
// https://github.com/yahoo/flux-examples/tree/master/react-router
require('babel/register');

var express = require('express');
var expressState = require('express-state');
var debug = require('debug')('Server');
var React = require('react');
var FluxibleComponent = require('fluxible-addons-react/FluxibleComponent');
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
    var context = app.createContext();
    var location = createLocation(req.url);

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

                var htmlComponent = React.createFactory(Html);
                var routerComponent = React.createFactory(RoutingContext);

                var markup = React.renderToString(React.createElement(
                    FluxibleComponent, {
                        context: context.getComponentContext()
                    },
                    routerComponent(renderProps)
                ));

                var html = React.renderToStaticMarkup(React.createElement(
                    FluxibleComponent, {
                        context: context.getComponentContext()
                    },
                    htmlComponent({
                        state: res.locals.state,
                        markup: markup,
                        location: location
                    })
                ));

                res.send('<!doctype html>' + html);
            });
        }
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
debug('Listening on port ' + port);
