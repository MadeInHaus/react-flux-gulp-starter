require('node-jsx').install({ extension: '.jsx' })

var express = require('express');
var expressState = require('express-state');
var debug = require('debug')('Server');
var React = require('react');
var Router = require('react-router');
var app = require('./src/javascript/app');
var Html = require('./src/javascript/components/Html.jsx');
var navigateAction = require('./src/javascript/actions/navigate');

var server = express();

expressState.extend(server);

server.use('/', express.static(__dirname + '/build'));

server.use(function (req, res, next) {
    var context = app.createContext();

    Router.run(app.getComponent(), req.path, function (Handler, state) {
        context.executeAction(navigateAction, state, function () {

            res.expose(app.dehydrate(context), 'App');

            var HtmlComponent = React.createFactory(Html);
            var HandlerComponent = React.createFactory(Handler);
            var html = React.renderToStaticMarkup(HtmlComponent({
                state: res.locals.state,
                markup: React.renderToString(HandlerComponent({ context: context.getComponentContext() }))
            }));

            res.send('<!doctype html>' + html);

        });
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
debug('Listening on port ' + port);
