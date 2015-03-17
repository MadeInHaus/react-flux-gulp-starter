'use strict';

var React = require('react');
var Link = require('react-router').Link;
var StateMixin = require('react-router').State;

var Nav = React.createClass({

    mixins: [StateMixin],

    render: function() {
        var homeClass = this.isActive('/') ? 'selected' : '';
        var aboutClass = this.isActive('/about') ? 'selected' : ''
        var deadClass = this.isActive('/sgfjhsdgfjhsdgfjsd') ? 'selected' : ''
        return (
            <ul>
                <li className={homeClass}><Link to='/'>Home</Link></li>
                <li className={aboutClass}><Link to='/about'>About</Link></li>
                <li className={deadClass}><Link to='/sgfjhsdgfjhsdgfjsd'>Dead link</Link></li>
            </ul>
        );
    }

});

module.exports = Nav;
