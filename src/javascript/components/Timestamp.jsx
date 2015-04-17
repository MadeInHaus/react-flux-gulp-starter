'use strict';

var React = require('react');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var TimeStore = require('../stores/TimeStore');
var updateTime = require('../actions/updateTime');

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
        var currentTime = new Date(this.state.time);
        return (
            <div className="timestamp">
                <span>{currentTime.toGMTString()}</span>
                <button onClick={this.onReset}>Update</button>
            </div>
        );
    }

});

module.exports = Timestamp;
