// Inspired by
// http://fluxible.io/tutorials/routing.html
// https://github.com/yahoo/flux-examples/tree/master/react-router
require('babel/register');

var express = require('express');
var expressState = require('express-state');
var debug = require('debug')('Server');
var React = require('react');
var Router = require('react-router');
var FluxibleComponent = require('fluxible-addons-react/FluxibleComponent');
var app = require('./src/javascript/app');
var Html = require('./src/javascript/components/Html.jsx');
var navigateAction = require('./src/javascript/actions/navigate');

var server = express();

expressState.extend(server);

server.use('/', express.static(__dirname + '/build'));

server.use(function (req, res, next) {
    var context = app.createContext();

    Router.run(app.getComponent(), req.path, function (Handler, state) {

        context.executeAction(navigateAction, state, function (err) {

            var appState = app.dehydrate(context);

            res.expose(appState, 'App');

            var HtmlComponent = React.createFactory(Html);
            var HandlerComponent = React.createFactory(Handler);

            var markup = React.renderToString(React.createElement(
                FluxibleComponent,
                { context: context.getComponentContext() },
                HandlerComponent()
            ));

            var html = React.renderToStaticMarkup(HtmlComponent({
                title: "react-flux-gulp-starter",
                state: res.locals.state,
                markup: markup
            }));

            res.send('<!doctype html>' + html);

        });
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
debug('Listening on port ' + port);
