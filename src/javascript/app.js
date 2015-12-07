import Fluxible from 'fluxible';
import {PropTypes} from 'react';
import Routes from './components/Routes.jsx';
import ApplicationStore from './stores/ApplicationStore';
import TimeStore from './stores/TimeStore';

let assetUrl = require('./libs/assetUrl');

let app = new Fluxible({
    component: Routes
});

app.plug(assetUrl);

app.customContexts = {
    assetUrl: PropTypes.func.isRequired,
    siteUrl: PropTypes.func.isRequired,
};

app.registerStore(ApplicationStore);
app.registerStore(TimeStore);

export default app;
