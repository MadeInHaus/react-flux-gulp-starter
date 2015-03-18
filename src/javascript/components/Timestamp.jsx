'use strict';

var React = require('react');
var ReactIntl = require('react-intl');
var FluxibleMixin = require('fluxible').Mixin;
var IntlMixin = ReactIntl.IntlMixin;
var FormattedDate = ReactIntl.FormattedDate;
var FormattedTime = ReactIntl.FormattedTime;
var TimeStore = require('../stores/TimeStore');
var updateTime = require('../actions/updateTime');

var Timestamp = React.createClass({

    mixins: [FluxibleMixin, IntlMixin],

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
                <p onClick={this.onReset}>
                    <FormattedDate value={this.state.time} format="standard" />
                    <span>, </span>
                    <FormattedTime value={this.state.time} format="hhmmss" />
                </p>
            </footer>
        );
    }

});

module.exports = Timestamp;
