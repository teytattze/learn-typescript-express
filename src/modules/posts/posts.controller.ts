import * as express from 'express';
import { BaseController } from '../../shared/base/controller.base';
import { NotFoundException } from '../../exceptions/not-found.exception';
import { ValidationMiddleware } from '../../middlewares/validation.middleware';
import { IPost } from './posts.interface';
import { postModel } from './posts.model';
import { CreatePostDto, UpdatePostDto } from './dto';

export class PostsController extends BaseController {
  private readonly post = postModel;

  constructor() {
    super('/posts');
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPost);
    this.router.post(
      this.path,
      ValidationMiddleware(CreatePostDto),
      this.createSinglePost,
    );
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.patch(
      `${this.path}/:id`,
      ValidationMiddleware(UpdatePostDto, true),
      this.updateSinglePost,
    );
    this.router.delete(`${this.path}/:id`, this.deleteSinglePost);
  }

  async getAllPost(_: express.Request, res: express.Response) {
    const posts = await this.post.find();
    res.send(posts);
  }

  async createSinglePost(req: express.Request, res: express.Response) {
    const postData: IPost = req.body;
    const createdPost = new this.post(postData);
    const savedPost = await createdPost.save();
    res.send(savedPost);
  }

  async getPostById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { id } = req.params;
    const post = await this.post.findById(id);
    if (post) {
      res.send(post);
    }
    next(new NotFoundException('Post not found'));
  }

  async updateSinglePost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { id } = req.params;
    const postData = req.body;
    const updatedPost = await this.post.findByIdAndUpdate(id, postData, {
      new: true,
    });
    if (updatedPost) {
      res.send(updatedPost);
    }
    next(new NotFoundException('Post not found'));
  }

  async deleteSinglePost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { id } = req.params;
    const isSuccess = await this.post.findByIdAndDelete(id);
    if (isSuccess) {
      res.send({ message: 'The post have been deleted successfully' });
    }
    next(new NotFoundException('Post not found'));
  }
}
