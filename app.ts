import { TodoRouter } from './routes/todo-routes';
"use strict";

import * as http from 'http';
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as core from "express-serve-static-core";

class Server {
    private app: core.Express;
    private server: http.Server;
    private corsOptions: cors.CorsOptions;

    constructor() {
        this.corsOptions = {
            origin: ["http://localhost:4200"]
        };
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
        this.initRoutes();
        this.startServer();
    }

    initRoutes() {
        let todoRouter = new TodoRouter();
        this.app.use(todoRouter.configure());
    }

    static run() {
        let serverInstance = new Server();
        serverInstance.init();
    }
}

Server.run();
