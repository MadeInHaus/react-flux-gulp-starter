'use strict';

var React = require('react');
var updateTime = require('../actions/updateTime');
var TimeStore = require('../stores/TimeStore');
var FluxibleMixin = require('fluxible').Mixin;

var Timestamp = React.createClass({

    mixins: [FluxibleMixin],

    statics: {
        storeListeners: [TimeStore]
    },

    getInitialState: function () {
        return this.getStore(TimeStore).getState();
    },

    onChange: function () {
        var state = this.getStore(TimeStore).getState();
        this.setState(state);
    },

    onReset: function (event) {
        this.executeAction(updateTime);
    },

    render: function() {
        return (
            <footer>
                <p onClick={this.onReset}>{this.state.time}</p>
            </footer>
        );
    }

});

module.exports = Timestamp;
