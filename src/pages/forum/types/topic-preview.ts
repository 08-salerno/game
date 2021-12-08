import { User } from '../../../modules/api/types';

export type TopicPreview = {
    id: number;
    title: string;
    author: User;
    commentsCount: number;
    createdAt: string;
}
