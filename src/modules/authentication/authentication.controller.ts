import * as bcrypt from 'bcryptjs';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import { IUser } from '../../modules/users/users.interface';
import { BadRequestException, UnauthorizedException } from '../../exceptions';
import { CreateUserDto } from '../users/dto';
import { userModel } from '../users/users.model';
import { SALT } from './authentication.const';
import { IJwtPayload } from './authentication.interface';
import { LoginDto } from './dto';

export class AuthenticationController {
  registration = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const userData: CreateUserDto = req.body;
    const isSameEmail = await userModel.findOne({
      email: userData.email,
    });
    if (isSameEmail) {
      return next(new BadRequestException());
    }
    const hashedPassword = await bcrypt.hash(userData.password, SALT);
    const user = await userModel.create({
      ...userData,
      password: hashedPassword,
    });
    const tokenData = this.createToken(user);
    res.cookie('authorization', tokenData.token, {
      httpOnly: true,
      path: '/',
      maxAge: tokenData.expiresIn * 1000,
    });
    res.send(user);
  };

  login = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const loginData: LoginDto = req.body;
    const user = await userModel.findOne({ email: loginData.email });
    if (!user) {
      return next(new UnauthorizedException());
    }
    const isPasswordMatched = await bcrypt.compare(
      loginData.password,
      user!.password,
    );
    if (!isPasswordMatched) {
      return next(new UnauthorizedException());
    }
    const tokenData = this.createToken(user);
    res.cookie('authorization', tokenData.token, {
      httpOnly: true,
      path: '/',
      maxAge: tokenData.expiresIn * 1000,
    });
    res.send(_.omit(user, ['password']));
  };

  async logout(_: express.Request, res: express.Response) {
    res.cookie('authorization', '');
    res.send({ message: 'Logout successfully' });
  }

  private createToken = (user: IUser) => {
    const expiresIn = 15 * 60;
    const secret = process.env.JWT_SECRET as string;
    const payload: IJwtPayload = {
      _id: user._id.toString(),
    };
    return {
      token: jwt.sign(payload, secret, { expiresIn }),
      expiresIn,
    };
  };
}
