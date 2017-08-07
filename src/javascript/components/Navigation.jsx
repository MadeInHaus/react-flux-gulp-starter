import React, { PureComponent } from 'react';
import { Link, IndexLink } from 'react-router';

export default class Navigation extends PureComponent {
    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <IndexLink to="/" activeClassName="selected">
                            Home
                        </IndexLink>
                    </li>
                    <li>
                        <Link to="/page" activeClassName="selected">
                            Page
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/makejavascriptgreatagain"
                            activeClassName="selected"
                        >
                            404
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="https://github.com/MadeInHaus/react-flux-gulp-starter"
                            target="_blank"
                        >
                            Github
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}
