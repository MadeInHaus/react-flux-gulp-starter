import React, {PropTypes} from 'react';
import Navigation from './Navigation';
import {connectToStores}  from 'fluxible-addons-react';

class Application extends React.Component {

    render () {
        return (
            <div>
                <nav>
                    <Navigation />
                </nav>
                <main>
                    {React.cloneElement(this.props.children, { appState: this.props.appState })}
                </main>
            </div>
        );
    }

}

Application = connectToStores(Application, ['ApplicationStore'], (context, props) => ({
    appState: context.getStore('ApplicationStore').getState()
}));

export default Application;

