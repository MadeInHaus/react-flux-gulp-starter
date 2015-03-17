'use strict';

var React = require('react');
var FluxibleMixin = require('fluxible').Mixin;
var DataStore = require('../stores/DataStore');

var Home = React.createClass({

    mixins: [FluxibleMixin],

    statics: {
        storeListeners: [DataStore]
    },

    getInitialState: function () {
        return this.getStore(DataStore).getState();
    },

    onChange: function () {
        var state = this.getStore(DataStore).getState();
        this.setState(state);
    },

    render: function() {
        return (
            <div>
                <h1>Welcome to the site!</h1>
                <p>{this.state.data ? this.state.data.join(' ') : ''}</p>
            </div>
        );
    }

});

module.exports = Home;
