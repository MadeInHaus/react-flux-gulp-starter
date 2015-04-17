'use strict';

var React = require('react');

var Home = React.createClass({

    render: function() {
        return (
            <div>
                <h1>Welcome to react-flux-gulp-starter!</h1>
                <p>Clone on <a href="https://github.com/MadeInHaus/react-flux-gulp-starter">GitHub</a></p>
                <p>Made in <a href="http://madeinhaus.com/">HAUS</a></p>
            </div>
        );
    }

});

module.exports = Home;
