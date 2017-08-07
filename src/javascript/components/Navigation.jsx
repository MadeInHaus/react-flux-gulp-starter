import React, { PureComponent } from 'react';
import { Link, IndexLink } from 'react-router';

export default class Navigation extends PureComponent {
    render() {
        return (
            <div className="container">
                <IndexLink to="/" className="logo" activeClassName="selected">
                    Home
                </IndexLink>
                <Link to="/about" activeClassName="selected">
                    About
                </Link>
                <Link to="/makejavascriptgreatagain" activeClassName="selected">
                    404
                </Link>
                <Link
                    to="https://github.com/MadeInHaus/react-flux-gulp-starter"
                    target="_blank"
                >
                    Github
                </Link>
            </div>
        );
    }
}
