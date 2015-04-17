'use strict';

var React = require('react');
var Link = require('react-router').Link;

var Navigation = React.createClass({

    contextTypes: {
        router: React.PropTypes.func.isRequired
    },

    render: function() {
        var isActive = this.context.router.isActive;
        var homeClass = isActive('/') ? 'selected' : '';
        var aboutClass = isActive('/about') ? 'selected' : ''
        var deadClass = isActive('/sgfjhsdgfjhsdgfjsd') ? 'selected' : ''
        return (
            <ul className="navigation">
                <li className={homeClass}><Link to='/'>Home</Link></li>
                <li className={aboutClass}><Link to='/about'>About</Link></li>
                <li className={deadClass}><Link to='/sgfjhsdgfjhsdgfjsd'>Dead link</Link></li>
            </ul>
        );
    }

});

module.exports = Navigation;
