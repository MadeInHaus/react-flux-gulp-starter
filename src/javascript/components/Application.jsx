import React, {PropTypes} from 'react';
import Navigation from './Navigation';
import ApplicationStore from '../stores/ApplicationStore';
import {connectToStores}  from 'fluxible-addons-react';

class Application extends React.Component {

    render () {
        return (
            <div>
                <nav>
                    <Navigation />
                </nav>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }

}

Application = connectToStores(Application, [ApplicationStore], (context, props) => (
    context.getStore(ApplicationStore).getState()
));

export default Application;

