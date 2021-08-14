import { Request } from 'express';
import { IUser } from 'src/modules/users/users.interface';

export interface IRequestWithUser extends Request {
  user?: IUser;
}
