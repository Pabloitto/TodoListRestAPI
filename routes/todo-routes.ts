import * as express from 'express';

export class TodoRouter {
    private _route: express.Router;
    private _todos: Array<any>;

    constructor() {
        this._route = express.Router();
        this._todos = [];
    }

    public configure() {
        this._route.get('/api/todos', (request, response) => {
            response.json(this._todos);
        });

        this._route.delete('/api/todos/:desc', (req, res) => {
            let desc = req.params.desc;
            this._todos = this._todos.filter(item => item.description !== desc);
            res.json(this._todos);
        });

        this._route.post('/api/todos', (request, response) => {
            let todo = request.body;
            this._todos.push(todo);
            response.json(true);
        });

        this._route.patch('/api/todos', (request, response) => {
            let todo = request.body;
            let todoToUpdate = this._todos.filter(item => item.description === todo.description)[0];
            todoToUpdate.isDone = todo.isDone;
            response.json(true);
        });

        return this._route;
    }
}