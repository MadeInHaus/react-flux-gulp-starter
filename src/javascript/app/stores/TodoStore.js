var Fluxxor = require('fluxxor');
var constants = require('../constants');

var TodoStore = Fluxxor.createStore({

    initialize: function () {
        this.todos = [];

        this.bindActions(
            constants.ADD_TODO, this.onAddTodo,
            constants.TOGGLE_TODO, this.onToggleTodo,
            constants.CLEAR_TODOS, this.onClearTodos
        );
    },

    onAddTodo: function (payload) {
        this.todos.push({ text: payload.text, complete: false });
        this.emit("change");
    },

    onToggleTodo: function (payload) {
        payload.todo.complete = !payload.todo.complete;
        this.emit("change");
    },

    onClearTodos: function () {
        this.todos = this.todos.filter(function (todo) {
            return !todo.complete;
        });
        this.emit("change");
    },

    getState: function () {
        return {
            todos: this.todos
        };
    }

});

module.exports = TodoStore;
