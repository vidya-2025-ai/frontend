
import { User } from './user';

export interface PostComment {
  id: string;
  _id?: string;
  postId: string;
  author: string | User;
  content: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  isLiked?: boolean;
}

export interface CommunityPost {
  id: string;
  _id?: string;
  title: string;
  content: string;
  author: string | User;
  category: string;
  tags: string[];
  likes: number;
  comments: number | PostComment[]; // Allow both types
  replies?: PostComment[];
  createdAt: string;
  updatedAt: string;
  isLiked?: boolean;
}
