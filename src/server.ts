import { IEnvironment, initEnv } from './lib/init-env';
import { validateEnv } from './lib/validate-env';
import { PostsController } from './modules/posts/posts.controller';
import { App } from './app';

initEnv(process.env.NODE_ENV as IEnvironment);
validateEnv();

const app = new App([new PostsController()], 5000);

app.listen();
