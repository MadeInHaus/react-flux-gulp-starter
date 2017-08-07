import React, { Component, PropTypes } from 'react';
import Navigation from 'components/Navigation';
import { connectToStores } from 'fluxible-addons-react';

class Application extends Component {
    static propTypes = {
        appState: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired,
    };

    render() {
        return (
            <main>
                <Navigation />
                {React.cloneElement(this.props.children, {
                    appState: this.props.appState,
                })}
            </main>
        );
    }
}

Application = connectToStores(Application, ['ApplicationStore'], context => ({
    appState: context.getStore('ApplicationStore').getState(),
}));

export default Application;
