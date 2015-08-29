'use strict';

import React from 'react';

import {connectToStores}  from 'fluxible-addons-react';
import TimeStore from '../stores/TimeStore';
import updateTime from '../actions/updateTime';

class Timestamp extends React.Component{

    onReset (event) {
        this.context.executeAction(updateTime);
    }

    render () {
        var currentTime = new Date(this.props.time);
        return (
            <div className="timestamp">
                <span>{currentTime.toGMTString()}</span>
                <button onClick={this.onReset.bind(this)}>Update</button>
            </div>
        );
    }
}

Timestamp.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

Timestamp = connectToStores(Timestamp, [TimeStore], (context, props) => {
    return context.getStore(TimeStore).getState();
});

export default Timestamp;
