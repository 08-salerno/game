import { User } from '../../../modules/api/types';

export type Comment = {
  id: string;
  topicId: string;
  text: string;
  author: User;
  createdAt: string;
};
