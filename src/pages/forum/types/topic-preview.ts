import { User } from '../../../modules/api/AuthService';

export type TopicPreview = {
    id: string;
    title: string;
    author: User;
    commentCount: string;
    createdAt: string;
}
