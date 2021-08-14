import { IUser } from './modules/users/users.interface';

declare namespace Express {
  export interface Request {
    user?: IUser;
  }
}
