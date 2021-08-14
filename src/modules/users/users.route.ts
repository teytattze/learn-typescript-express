import { authMiddleware } from '../../middlewares/auth.middleware';
import { BaseRoute } from '../../shared/base/route.base';
import { UsersController } from './users.controller';

export class UsersRoute extends BaseRoute {
  private readonly usersController = new UsersController();

  constructor() {
    super('/users');
    this.initializeRoutes();
  }

  protected initializeRoutes = () => {
    this.router.get(
      `${this.path}/:id/posts`,
      authMiddleware,
      this.usersController.getUserAllPosts,
    );
  };
}
