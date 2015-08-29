'use strict';

import Fluxible from 'fluxible';

var app = new Fluxible({
    component: require('./components/Routes.jsx')
});

app.registerStore(require('./stores/ApplicationStore'));
app.registerStore(require('./stores/TimeStore'));

export default app;
