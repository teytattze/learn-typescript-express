import * as mongoose from 'mongoose';
import { IUser } from './users.interface';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

export const userModel = mongoose.model<IUser>('User', userSchema);
