import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { UnauthorizedException } from '../exceptions';
import { IJwtPayload } from '../modules/authentication/authentication.interface';
import { userModel } from '../modules/users/users.model';
import { IUser } from '../modules/users/users.interface';
import { IRequestWithUser } from '../shared/interfaces/request';

export const authMiddleware = async (
  req: IRequestWithUser,
  _: Response,
  next: NextFunction,
) => {
  const cookies = req.cookies;
  if (!cookies.authorization) {
    return next(new UnauthorizedException());
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const verificationRes = jwt.verify(
      cookies.authorization,
      secret,
    ) as IJwtPayload;
    const id = verificationRes._id;
    const user = await userModel.findById(id);
    if (user) {
      req.user = user as IUser;
      return next();
    }
    return next(new UnauthorizedException());
  } catch (err) {
    return next(new UnauthorizedException());
  }
};
