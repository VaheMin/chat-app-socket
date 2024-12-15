import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import v1 from './routes/v1';
import errorHandler from './services/error-handler.service';

class App {
  public express: express.Application;
  public httpServer: http.Server;
  public io: SocketIOServer;

  constructor() {
    this.express = express();
    this.httpServer = new http.Server(this.express);
    this.io = new SocketIOServer(this.httpServer, {
      cors: {
        origin: 'http://localhost:3002',
        methods: ['GET', 'POST', 'DELETE'],
      },
    });
    this.setMiddlewares();
    this.mountRoutes();
    this.catchErrors();
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(helmet());
  }

  private mountRoutes(): void {
    this.express.use('/api/v1', v1);
  }

  private catchErrors(): void {
    this.express.use(errorHandler.notFound);
    this.express.use(errorHandler.internalServerError);
  }
}

export default new App();
