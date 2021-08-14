import { authMiddleware } from '../../middlewares/auth.middleware';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { BaseRoute } from '../../shared/base/route.base';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostsController } from './posts.controller';

export class PostsRoute extends BaseRoute {
  private readonly postController = new PostsController();

  constructor() {
    super('/posts');
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get(this.path, this.postController.getAllPost);
    this.router.get(`${this.path}/:id`, this.postController.getPostById);

    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware(CreatePostDto),
      this.postController.createSinglePost,
    );

    this.router
      .all(`${this.path}/*`, authMiddleware)
      .patch(
        `${this.path}/:id`,
        validationMiddleware(UpdatePostDto, true),
        this.postController.updateSinglePost,
      )
      .delete(`${this.path}/:id`, this.postController.deleteSinglePost);
  }
}
