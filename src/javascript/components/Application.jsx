'use strict';

import React from 'react';
import Navigation from './Navigation';
import Timestamp from './Timestamp';
import ApplicationStore from '../stores/ApplicationStore';
import {RouteHandler} from 'react-router';
import {connectToStores, provideContext}  from 'fluxible-addons-react';

class Application extends React.Component {

    render () {
        return (
            <div>
                <nav>
                    <Navigation />
                </nav>
                <main>
                    <RouteHandler />
                </main>
                <footer>
                    <Timestamp />
                </footer>
            </div>
        );
    }

}

Application = connectToStores(Application, [ApplicationStore], (context, props) => (
    context.getStore(ApplicationStore).getState()
));

Application = provideContext(Application);

export default Application;

