import { TodoService } from './../services/todo-service';
import * as express from 'express';

export class TodoRouter {
    private _route: express.Router;
    private _todoService: TodoService;

    constructor() {
        this._route = express.Router();
        this._todoService = new TodoService();
    }

    public configure() {
        
        this._route.get('/api/todos', (req, res) => {
            let todos = this._todoService.getTodos();
            res.json(todos);
        });

        this._route.delete('/api/todos/:desc', (req, res) => {
            let desc = req.params.desc;
            let todos = this._todoService.deleteTodo(desc);
            res.json(todos);
        });

        this._route.post('/api/todos', (req, res) => {
            let todos = this._todoService.postTodo(req.body);
            res.json(todos);
        });

        this._route.patch('/api/todos', (req, res) => {
            let todoUpdated = this._todoService.updateTodo(req.body);
            res.json(todoUpdated);
        });

        return this._route;
    }
}