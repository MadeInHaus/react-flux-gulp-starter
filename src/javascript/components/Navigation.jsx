'use strict';

import React from 'react';
import {Link} from 'react-router';

export default class Navigation extends React.Component{
    render () {
        var isActive = this.context.router.isActive;
        var homeClass = isActive('/') ? 'selected' : '';
        var aboutClass = isActive('/about') ? 'selected' : ''
        var deadClass = isActive('/sgfjhsdgfjhsdgfjsd') ? 'selected' : ''
        return (
            <ul className="navigation">
                <li className={homeClass}><Link to='/'>Home</Link></li>
                <li className={aboutClass}><Link to='/about'>About</Link></li>
                <li className={deadClass}><Link to='/sgfjhsdgfjhsdgfjsd'>404</Link></li>
            </ul>
        );
    }
}

Navigation.contextTypes = {
    router: React.PropTypes.func.isRequired
};
