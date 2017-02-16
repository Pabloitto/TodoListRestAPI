"use strict";

let http = require('http');
let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');

class Server {

    constructor() {
        this.todos = [];
        this.app = express();
        this.server = http.createServer(this.app);
        this.app.use(cors({
            origin: "http://localhost:4200"
        }));
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
            let todoToUpdate = this.todos.find(item => item.description === todo.description);
            todoToUpdate.isDone = todo.isDone;
            response.json(true);
        });

        this.startServer();
    }

    startServer() {
        this.app.set('port', (process.env.PORT || 4800));
        let port = this.app.get('port');
        this.app.listen(port, function () {
            console.log('Node app is running on port', port);
        });
    }
}

new Server().init();