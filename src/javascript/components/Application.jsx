'use strict';

var React = require('react');
var FluxibleMixin = require('fluxible').Mixin;
var Nav = require('./Nav.jsx');
var Timestamp = require('./Timestamp.jsx');
var ApplicationStore = require('../stores/ApplicationStore');
var RouteHandler = require('react-router').RouteHandler;

var Application = React.createClass({

    mixins: [FluxibleMixin],

    statics: {
        storeListeners: [ApplicationStore]
    },

    getInitialState: function () {
        return this.getStore(ApplicationStore).getState();
    },

    onChange: function () {
        var state = this.getStore(ApplicationStore).getState();
        this.setState(state);
    },

    render: function () {
        return (
            <div>
                <Nav />
                <main>
                    <RouteHandler />
                </main>
                <Timestamp />
            </div>
        );
    }

});

module.exports = Application;
