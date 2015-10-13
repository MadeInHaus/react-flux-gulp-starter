import Fluxible from 'fluxible';
import {PropTypes} from 'react';
import Routes from './components/Routes.jsx';

let assetUrl = require('./libs/assetUrl');

let app = new Fluxible({
    component: Routes
});

app.plug(assetUrl);

app.customContexts = {
    assetUrl: PropTypes.func.isRequired,
    siteUrl: PropTypes.func.isRequired,
};

app.registerStore(require('./stores/ApplicationStore'));
app.registerStore(require('./stores/TimeStore'));

export default app;
