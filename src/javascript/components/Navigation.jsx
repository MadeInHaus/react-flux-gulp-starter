import React, {PropTypes} from 'react';
import {IndexLink, Link} from 'react-router';

export default class Navigation extends React.Component {

    render () {
        return (
            <ul className="navigation">
                <li><IndexLink to="/" activeClassName="selected">Home</IndexLink></li>
                <li><Link to='/about' activeClassName="selected">About</Link></li>
                <li><Link to='/makejavascriptgreatagain' activeClassName="selected">404</Link></li>
            </ul>
        );
    }

}
