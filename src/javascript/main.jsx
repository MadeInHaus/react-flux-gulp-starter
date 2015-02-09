var React = require('react');
var Fluxxor = require('fluxxor');

var App = require('./app/app')
var TodoStore = require('./app/stores/TodoStore');
var constants = require('./app/constants');

var actions = {
    addTodo: function(text) {
        this.dispatch(constants.ADD_TODO, { text: text });
    },
    toggleTodo: function(todo) {
        this.dispatch(constants.TOGGLE_TODO, { todo: todo });
    },
    clearTodos: function() {
        this.dispatch(constants.CLEAR_TODOS);
    }
};

var stores = {
    TodoStore: new TodoStore()
};

var flux = new Fluxxor.Flux(stores, actions);

flux.on("dispatch", function (type, payload) {
    if (console && console.log) {
        console.log("[Dispatch]", type, payload);
    }
});

React.render(<App flux={flux} />, document.getElementById('app'));
