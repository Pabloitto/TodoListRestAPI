"use strict";
var express = require("express");
var TodoRouter = (function () {
    function TodoRouter() {
        this._route = express.Router();
        this._todos = [];
    }
    TodoRouter.prototype.configure = function () {
        var _this = this;
        this._route.get('/api/todos', function (request, response) {
            response.json(_this._todos);
        });
        this._route.delete('/api/todos/:desc', function (req, res) {
            var desc = req.params.desc;
            _this._todos = _this._todos.filter(function (item) { return item.description !== desc; });
            res.json(_this._todos);
        });
        this._route.post('/api/todos', function (request, response) {
            var todo = request.body;
            _this._todos.push(todo);
            response.json(true);
        });
        this._route.patch('/api/todos', function (request, response) {
            var todo = request.body;
            var todoToUpdate = _this._todos.filter(function (item) { return item.description === todo.description; })[0];
            todoToUpdate.isDone = todo.isDone;
            response.json(true);
        });
        return this._route;
    };
    return TodoRouter;
}());
exports.TodoRouter = TodoRouter;
//# sourceMappingURL=todo-routes.js.map