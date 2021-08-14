import { IEnvironment, initEnv } from './lib/init-env';
import { validateEnv } from './lib/validate-env';
import { App } from './app';
import { PostsRoute } from './modules/posts/posts.route';
import { UsersRoute } from './modules/users/users.route';
import { AuthenticationRoute } from './modules/authentication/authentication.route';
import { BaseRoute } from './shared/base/route.base';

const initRoutes = (): BaseRoute[] => {
  const authenticationRoute = new AuthenticationRoute();
  const usersRoute = new UsersRoute();
  const postsRoute = new PostsRoute();
  return [authenticationRoute, usersRoute, postsRoute];
};

const bootstrap = () => {
  // leave the params blank
  // if you want to use .env
  initEnv(process.env.NODE_ENV as IEnvironment);
  validateEnv();

  const app = new App(initRoutes(), 5000);

  app.listen();
};

bootstrap();
