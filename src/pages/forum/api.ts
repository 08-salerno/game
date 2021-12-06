import { Topic } from './types/topic';
import { TopicPreview } from './types/topic-preview';
import { Comment } from './types/comment';
import UserService from '../../modules/api/UserService';
import { User } from '../../modules/api/types';
import { salernoEndpoint } from '../../modules/utils/constants';

export const defaultQueryLimit = 10;

const topicUrl = `${salernoEndpoint}/topic`;
const commentUrl = `${salernoEndpoint}/comment`;

/* eslint-disable @typescript-eslint/no-explicit-any*/
// todo [sitnik] надо переделать
function getAuthorForSmth(smth: {author: User} & {authorId: number}): Promise<any> {
  const { authorId } = smth;
  return new UserService().getUser(authorId)
    .then((user) => {
      smth.author = user;
      return smth;
    });
}
/* eslint-enable @typescript-eslint/no-explicit-any*/

export function getTopicPreviews(
  offset: number = 0,
  limit: number = defaultQueryLimit,
): Promise<TopicPreview[]> {
  return fetch(`${topicUrl}/${offset}/${limit}`, {
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((topics) => Promise.all(topics.map(getAuthorForSmth)));
}

export function getTopic(id: string): Promise<Topic | null> {
  return fetch(`${topicUrl}/${id}`, {
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((topic) => {
      if (!topic) {
        return null;
      }
      return getAuthorForSmth(topic);
    });
}

export function getTopicCommentCount(id: string): Promise<number> {
  return fetch(`${commentUrl}/${id}/count`, {
    credentials: 'include',
  })
    .then((response) => response.text())
    .then((count) => Promise.resolve(Number(count)));
}

export function createTopic(title: string): Promise<number> {
  return fetch(`${topicUrl}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  }).then((response) => response.text())
    .then((id) => Number(id));
}

export function getComments(
  topicId: string,
  offset: number = 0,
  limit: number = defaultQueryLimit,
): Promise<Comment[]> {
  return fetch(`${commentUrl}/${topicId}/${offset}/${limit}`, {
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((comments) => Promise.all(comments.map(getAuthorForSmth)));
}

export function leaveComment(
  topicId: string,
  text: string,
): Promise<Comment> {
  return fetch(`${commentUrl}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topicId, text }),
  }).then((response) => response.json())
    .then((comment) => getAuthorForSmth(comment));
}
