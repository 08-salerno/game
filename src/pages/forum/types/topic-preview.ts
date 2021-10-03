import { User } from '../../../modules/api/types';

export type TopicPreview = {
    id: string;
    title: string;
    author: User;
    commentCount: string;
    createdAt: string;
}
