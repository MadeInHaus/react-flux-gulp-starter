import React, { Component } from 'react';

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to react-flux-gulp-starter!</h1>
                <ul>
                    <li>
                        Clone on{' '}
                        <a
                            href="https://github.com/MadeInHaus/react-flux-gulp-starter"
                            target="_blank"
                        >
                            GitHub
                        </a>
                    </li>
                    <li>
                        Made in{' '}
                        <a href="http://madeinhaus.com/" target="_blank">
                            HAUS
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}
