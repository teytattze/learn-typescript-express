import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { errorMiddleware } from './middlewares/error.middleware';
import { BaseRoute } from './shared/base/route.base';

export class App {
  private app: express.Application;
  private port: number;

  constructor(routes: BaseRoute[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: BaseRoute[]) {
    routes.forEach((route: BaseRoute) => {
      this.app.use('/api', route.getRouter());
    });
  }

  private async initializeDatabase() {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
    try {
      await mongoose.connect(
        `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        },
      );
      console.log('Database connected successfully');
    } catch (err) {
      return err;
    }
  }

  private async initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}
