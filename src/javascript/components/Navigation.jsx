'use strict';

import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export default class Navigation extends React.Component{
    render () {
        var isActive = this.context.history.isActive;
        var homeClass = isActive('/') ? 'selected' : '';
        var aboutClass = isActive('/about') ? 'selected' : ''
        var deadClass = isActive('/sgfjhsdgfjhsdgfjsd') ? 'selected' : ''
        return (
            <ul className="navigation">
                <li className={homeClass}><Link to='/' activeClassName="selected">Home</Link></li>
                <li className={aboutClass}><Link to='/about' activeClassName="selected">About</Link></li>
                <li className={deadClass}><Link to='/sgfjhsdgfjhsdgfjsd' activeClassName="selected">404</Link></li>
            </ul>
        );
    }
}

Navigation.contextTypes = {
    history: PropTypes.object.isRequired
};
