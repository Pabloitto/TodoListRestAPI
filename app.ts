"use strict";

import * as http from 'http';
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as core from "express-serve-static-core";

class Server {
    private todos: Array<any>;
    private app: core.Express;
    private server: http.Server;
    private corsOptions: cors.CorsOptions;

    constructor() {
        this.corsOptions = {
            origin: ["http://localhost:4200"]
        };
        this.todos = [];
        this.app = express();
        this.server = http.createServer(this.app);
        this.app.use(cors(this.corsOptions));
    }

    startServer() {
        this.app.set('port', (process.env.PORT || 4800));
        let port = this.app.get('port');
        this.app.listen(port, function () {
            console.log('Node app is running on port', port);
        });
    }

    init() {
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(express.static(path.resolve(__dirname, 'client')));

        this.app.get('/api/todos', (request, response) => response.json(this.todos));

        this.app.delete('/api/todos/:desc', (req, res) => {
            let desc = req.params.desc;
            this.todos = this.todos.filter(item => item.description !== desc);
            res.json(this.todos);
        });

        this.app.post('/api/todos', (request, response) => {
            let todo = request.body;
            this.todos.push(todo);
            response.json(true);
        });

        this.app.patch('/api/todos', (request, response) => {
            let todo = request.body;
            let todoToUpdate = this.todos.filter(item => item.description === todo.description)[0];
            todoToUpdate.isDone = todo.isDone;
            response.json(true);
        });

        this.startServer();
    }

    static run() {
        let serverInstance = new Server();
        serverInstance.init();
    }
}

Server.run();
