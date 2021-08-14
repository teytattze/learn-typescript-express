import * as express from 'express';
import { UnauthorizedException } from '../../exceptions';
import { IRequestWithUser } from '../../shared/interfaces/request';
import { postModel } from '../posts/posts.model';

export class UsersController {
  getUserAllPosts = async (
    req: IRequestWithUser,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const { id } = req.params;
    if (id !== req.user?._id.toString()) {
      return next(new UnauthorizedException());
    }
    const post = await postModel.find({ author: id });
    res.send(post);
  };
}
