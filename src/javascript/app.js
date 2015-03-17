'use strict';

var Fluxible = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');

var app = new Fluxible({
    component: require('./components/Routes.jsx')
});

app.plug(fetchrPlugin({
    xhrPath: '/api' // Path for XHR to be served from
}));

app.registerStore(require('./stores/ApplicationStore'));
app.registerStore(require('./stores/TimeStore'));
app.registerStore(require('./stores/DataStore'));

module.exports = app;
