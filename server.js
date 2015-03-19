require('node-jsx').install({ extension: '.jsx' })

if (!global.Intl) {
    // Intl polyfill for node <= 0.10
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
        context.executeAction(loadDataAction, { locales: [locale] }, function() {
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
                    yepnope: 'window.yepnope=function(a,b){function c(){}function d(a){return Object(a)===a}function e(a){return"string"==typeof a}function f(){return"yn_"+q++}function g(){o&&o.parentNode||(o=b.getElementsByTagName("script")[0])}function h(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function i(b,c){c.call(a)}function j(a,j){var k,l,m;e(a)?k=a:d(a)&&(k=a._url||a.src,l=a.attrs,m=a.timeout),j=j||c,l=l||{};var q,r,t=b.createElement("script");m=m||n.errorTimeout,t.src=k,s&&(t.event="onclick",t.id=t.htmlFor=l.id||f());for(r in l)t.setAttribute(r,l[r]);t.onreadystatechange=t.onload=function(){if(!q&&h(t.readyState)){if(q=1,s)try{t.onclick()}catch(a){}i(k,j)}t.onload=t.onreadystatechange=t.onerror=null},t.onerror=function(){q=1,j(new Error("Script Error: "+k))},p(function(){q||(q=1,j(new Error("Timeout: "+k)),t.parentNode.removeChild(t))},m),g(),o.parentNode.insertBefore(t,o)}function k(f,h){var i,j,k={};d(f)?(i=f._url||f.href,k=f.attrs||{}):e(f)&&(i=f);var l=b.createElement("link");h=h||c,l.href=i,l.rel="stylesheet",l.media="only x",l.type="text/css",p(function(){l.media=k.media||"all"});for(j in k)l.setAttribute(j,k[j]);g(),o.parentNode.appendChild(l),p(function(){h.call(a)})}function l(a){var b=a.split("?")[0];return b.substr(b.lastIndexOf(".")+1)}function m(a,b){var c=a,d=[],e=[];for(var f in b)b.hasOwnProperty(f)&&(b[f]?d.push(encodeURIComponent(f)):e.push(encodeURIComponent(f)));return(d.length||e.length)&&(c+="?"),d.length&&(c+="yep="+d.join(",")),e.length&&(c+=(d.length?"&":"")+"nope="+e.join(",")),c}function n(a,b,c){var e;d(a)&&(e=a,a=e.src||e.href),a=n.urlFormatter(a,b),e?e._url=a:e={_url:a};var f=l(a);if("js"===f)j(e,c);else{if("css"!==f)throw new Error("Unable to determine filetype.");k(e,c)}}var o,p=a.setTimeout,q=0,r={}.toString,s=!(!b.attachEvent||a.opera&&"[object Opera]"==r.call(a.opera));return n.errorTimeout=1e4,n.injectJs=j,n.injectCss=k,n.urlFormatter=m,n}(window,document);yepnope.urlFormatter=function(url,tests){var parts=url.split("."),extension = parts.pop(),filename = parts.join("."),passes = [];if(tests){for(var testname in tests){if(tests.hasOwnProperty(testname)&&tests[testname]){passes.push(testname)}}}if(passes.length){return filename+"-"+passes.join("-")+"."+extension}return url};',
                    yepnopeTest: 'yepnope("/js/client.js", { intl: typeof window.Intl === "undefined" });',
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
