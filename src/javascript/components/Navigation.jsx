import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

export default class Navigation extends React.Component {

    static contextTypes = {
        getBreakpoints: PropTypes.object.isRequired,
    };

    render() {
        const breakpoint = this.context.getBreakpoints.getActive();

        return (
            <div className="container">
                <IndexLink to="/" className="logo" activeClassName="selected">Home</IndexLink>
                <Link to="/about" activeClassName="selected">About</Link>
                <Link to="/makejavascriptgreatagain" activeClassName="selected">404</Link>
                <Link to="https://github.com/MadeInHaus/react-flux-gulp-starter" target="_blank">Github</Link>
                <div style={{position: 'absolute', bottom: '2em', right: '2em'}}>Breakpoint: {breakpoint}</div>
            </div>
        );
    }

}
