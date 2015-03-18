'use strict';

var React = require('react');
var ReactIntl = require('react-intl');
var FluxibleMixin = require('fluxible').Mixin;
var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;
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
        var currentTime = new Date(this.state.time);
        return (
            <footer>
                <p onClick={this.onReset}>
                    <FormattedMessage message={this.getIntlMessage('currentTimeDate')} currentTime={currentTime} />
                </p>
            </footer>
        );
    }

});

module.exports = Timestamp;
