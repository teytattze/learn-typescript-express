import { validateEnv } from './lib/validate-env';
import { PostsController } from './modules/posts/posts.controller';
import { App } from './app';
import 'dotenv/config';

validateEnv();

const app = new App([new PostsController()], 5000);

app.listen();
