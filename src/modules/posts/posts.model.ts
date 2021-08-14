import * as mongoose from 'mongoose';
import { IPost } from './posts.interface';

// One to Many
const postSchema = new mongoose.Schema({
  author: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  content: String,
  title: String,
});

export const postModel = mongoose.model<IPost & mongoose.Document>(
  'Post',
  postSchema,
);
