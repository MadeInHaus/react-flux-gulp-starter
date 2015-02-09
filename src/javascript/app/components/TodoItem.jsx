var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var TodoItem = React.createClass({

    mixins: [ FluxMixin ],

    propTypes: {
        todo: React.PropTypes.object.isRequired
    },

    render: function() {
        var style = {
            textDecoration: this.props.todo.complete ? "line-through" : ""
        };
        return (
            <span style={style} onClick={this.onClick}>{this.props.todo.text}</span>
        );
    },

    onClick: function() {
        this.getFlux().actions.toggleTodo(this.props.todo);
    }

});

module.exports = TodoItem;
