import * as mongoose from 'mongoose';
import { IUser } from './users.interface';

const addressSchema = new mongoose.Schema({
  city: String,
  street: String,
  country: String,
});

// One to one
const userSchema = new mongoose.Schema({
  address: addressSchema,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export const userModel = mongoose.model<IUser>('User', userSchema);
