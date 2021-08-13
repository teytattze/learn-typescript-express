import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { errorMiddleware } from './middlewares/error.middleware';

export class App {
	private app: express.Application;
	private port: number;

	constructor(controllers, port) {
		this.app = express();
		this.port = port;

		this.initializeDatabase();
		this.initializeMiddlewares();
		this.initializeControllers(controllers);
		this.initializeErrorHandling();
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`App listening on port ${this.port}`);
		});
	}

	private initializeMiddlewares() {
		this.app.use(bodyParser.json());
	}

	private initializeControllers(controllers) {
		controllers.forEach((controller) => {
			this.app.use('/api', controller.getRouter());
		});
	}

	private async initializeDatabase() {
		const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
		try {
			await mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				useCreateIndex: true,
			});
		} catch (err) {
			return err;
		}
	}

	private async initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}
}
