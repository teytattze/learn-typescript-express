import { validationMiddleware } from '../../middlewares/validation.middleware';
import { BaseRoute } from '../../shared/base/route.base';
import { CreateUserDto } from '../users/dto';
import { AuthenticationController } from './authentication.controller';
import { LoginDto } from './dto';

export class AuthenticationRoute extends BaseRoute {
  private authController = new AuthenticationController();

  constructor() {
    super('/auth');
    this.initializeRoutes();
  }

  protected initializeRoutes = () => {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto),
      this.authController.registration,
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LoginDto),
      this.authController.login,
    );
    this.router.post(`${this.path}/logout`, this.authController.logout);
  };
}
