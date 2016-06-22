import React, { PropTypes } from 'react';
import Navigation from 'components/Navigation';
import { connectToStores } from 'fluxible-addons-react';
import { windowSizeChange, breakpointUpdate } from 'actions/globalUx';

class Application extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        router: PropTypes.object.isRequired,
        getBreakpoints: PropTypes.object.isRequired,
        assetUrl: PropTypes.func.isRequired,
    };

    static propTypes = {
        appState: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired,
    };

     componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.context.executeAction(windowSizeChange, {
            width: window.innerWidth,
            height: window.innerHeight,
        });

        this.context.executeAction(breakpointUpdate);
    };

    render() {
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

Application = connectToStores(Application, ['ApplicationStore'], (context) => ({
    appState: context.getStore('ApplicationStore').getState(),
}));

export default Application;
