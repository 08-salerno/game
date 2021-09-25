import { User } from '../../../modules/api/AuthService';

export type Comment = {
  id: string;
  topicId: string;
  text: string;
  author: User;
  createdAt: string;
};
