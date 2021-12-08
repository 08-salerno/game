import { User } from '../../../modules/api/types';

export type Comment = {
  id: number;
  topicId: number;
  text: string;
  author: User;
  createdAt: string;
};
