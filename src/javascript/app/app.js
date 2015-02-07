var React = require('react');

var App = React.createClass({

    render: function() {

        return (
            <div>
                <h1>Header 1</h1>
                <h2>Header 2</h2>
                <h3>Header 3</h3>
                <h4>Header 4</h4>
                <h5>Header 5</h5>
                <h6>Header 6</h6>
                <hr />
                <p>Currently viewing <a href="/">index.html</a></p>
                <ul>
                    <li>Unordered list item</li>
                    <li>Unordered list item</li>
                    <li>Unordered list item</li>
                </ul>
                <button>This is a button</button>
            </div>
        );
    }

});

module.exports = App;
