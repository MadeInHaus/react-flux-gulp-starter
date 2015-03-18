require('node-jsx').install({ extension: '.jsx' })

if (!global.Intl) {
    global.Intl = require('intl');
}

var express = require('express');
var expressState = require('express-state');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var debug = require('debug')('Server');
var React = require('react');
var Router = require('react-router');
var app = require('./src/javascript/app');
var Html = require('./src/javascript/components/Html.jsx');
var loadDataAction = require('./src/javascript/actions/loadData');
var navigateAction = require('./src/javascript/actions/navigate');
var dataService = require('./src/javascript/services/data');

var server = express();

expressState.extend(server);

server.use('/', express.static(__dirname + '/build'));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(csrf({ cookie: true }));

// Register 'data' REST service and set up the fetchr middleware
var fetchrPlugin = app.getPlugin('FetchrPlugin');
fetchrPlugin.registerService(dataService);
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

server.use(function (req, res, next) {
    var locale = req.acceptsLanguages(['en', 'de', 'pt']) || 'en';

    var context = app.createContext({
        // The fetchr plugin depends on this
        req: req,
        xhrContext: {
            _csrf: req.csrfToken()
        }
    });

    Router.run(app.getComponent(), req.path, function (Handler, state) {
        context.executeAction(loadDataAction, { locale: locale }, function() {
            context.executeAction(navigateAction, state, function (err) {

                if (err) {
                    if (err.status && err.status === 404) {
                        next();
                    } else {
                        next(err);
                    }
                    return;
                }

                res.expose(app.dehydrate(context), 'App');

                var HtmlComponent = React.createFactory(Html);
                var HandlerComponent = React.createFactory(Handler);

                var componentContext = context.getComponentContext();
                var localeStoreState = componentContext.getStore('LocaleStore').getState();

                var html = React.renderToStaticMarkup(HtmlComponent({
                    locale: locale, // <html lang={locale}>
                    state: res.locals.state,
                    markup: React.renderToString(HandlerComponent({
                        context: componentContext,
                        locales: localeStoreState.locales,
                        formats: localeStoreState.formats,
                        messages: localeStoreState.messages
                    }))
                }));

                res.send('<!doctype html>' + html);

            });
        });
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
debug('Listening on port ' + port);
