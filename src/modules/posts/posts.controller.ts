import * as express from 'express';
import { NotFoundException } from '../../exceptions';
import { IRequestWithUser } from '../../shared/interfaces/request';
import { IPost } from './posts.interface';
import { postModel } from './posts.model';

export class PostsController {
  getAllPost = async (_: express.Request, res: express.Response) => {
    const posts = await postModel.find();
    res.send(posts);
  };

  createSinglePost = async (req: IRequestWithUser, res: express.Response) => {
    const postData: IPost = req.body;
    const createdPost = new postModel({
      ...postData,
      author: req.user?._id,
    });
    const savedPost = await createdPost.save();
    await savedPost.populate('author', '-password').execPopulate();
    res.send(savedPost);
  };

  getPostById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const { id } = req.params;
    const post = await postModel.findById(id);
    if (post) {
      res.send(post);
    }
    return next(new NotFoundException('Post not found'));
  };

  updateSinglePost = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const { id } = req.params;
    const postData = req.body;
    const updatedPost = await postModel.findByIdAndUpdate(id, postData, {
      new: true,
    });
    if (updatedPost) {
      res.send(updatedPost);
    }
    return next(new NotFoundException('Post not found'));
  };

  deleteSinglePost = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const { id } = req.params;
    const isSuccess = await postModel.findByIdAndDelete(id);
    if (isSuccess) {
      res.send({ message: 'The post have been deleted successfully' });
    }
    return next(new NotFoundException('Post not found'));
  };
}
