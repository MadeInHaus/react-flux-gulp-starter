require('node-jsx').install({ extension: '.jsx' })

var express = require('express');
var expressState = require('express-state');
//var favicon = require('serve-favicon');
var navigateAction = require('./src/javascript/actions/navigate');
var debug = require('debug')('Server');
var React = require('react');
var app = require('./src/javascript/app');
var HtmlComponent = React.createFactory(require('./src/javascript/components/Html.jsx'));
var Router = require('react-router');

var server = express();
expressState.extend(server);
//server.use(favicon(__dirname + '/../favicon.ico'));
server.use('/', express.static(__dirname + '/build'));

server.use(function (req, res, next) {
    var context = app.createContext();

    Router.run(app.getComponent(), req.path, function (Handler, state) {
        context.executeAction(navigateAction, state, function () {

            res.expose(app.dehydrate(context), 'App');

            var Component = React.createFactory(Handler);
            var html = React.renderToStaticMarkup(HtmlComponent({
                state: res.locals.state,
                markup: React.renderToString(Component({ context: context.getComponentContext() }))
            }));

            var doctype = '<!doctype html>\n';
            res.send(doctype + html);

        });
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
debug('Listening on port ' + port);
