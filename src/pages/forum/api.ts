import { Topic } from './types/topic';
import { TopicPreview } from './types/topic-preview';
import { Comment } from './types/comment';

/* eslint-disable no-void */

function mockTopics(): TopicPreview[] {
  const topics: TopicPreview[] = [];
  for (let i = 0; i < 100; i++) {
    topics.push({
      id: String(i),
      title: `Topic title for ${i}`,
      author: {
        login: 'Test author',
      }, // User
      commentCount: i === 1 ? '100' : '0',
      createdAt: 'Date',
    });
  }
  return topics;
}

function mockComments(topicId: string): Comment[] {
  const comments: Comment[] = [];
  for (let i = 0; i < 100; i++) {
    comments.push({
      id: String(i),
      topicId,
      text: 'Bla bla bla',
      author: {
        login: 'Test author in comments',
      }, // User
      createdAt: 'Date',
    });
  }
  return comments;
}

export const defaultQueryOffset = 25;
export const defaultQueryLimit = 25;

export function getTopicPreviews(
  offset: number = 0,
  limit: number = defaultQueryLimit,
): Promise<TopicPreview[]> {
  return new Promise<TopicPreview[]>((resolve) => {
    setTimeout(() => {
      const topics = mockTopics();
      resolve(topics.slice(offset, offset + limit));
    }, 1000);
  });
}

export function getTopic(id: string): Promise<Topic | undefined> {
  return new Promise<Topic | undefined>((resolve, reject) => {
    setTimeout(() => {
      const topic = mockTopics().find((t) => t.id === id) as Topic | undefined;
      if (!topic) {
        reject();
        return;
      }
      topic.somethingElse = false;
      resolve(topic);
    }, 1000);
  });
}

export function createTopic(title: string): Promise<string> {
  void title;
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      const randomPostId = Math.floor(Math.random() * 100) + 100;
      resolve(randomPostId.toString());
    }, 1000);
  });
}

export function getComments(
  topicId: string,
  offset: number = 0,
  limit: number = defaultQueryLimit,
): Promise<Comment[]> {
  return new Promise<Comment[]>((resolve) => {
    setTimeout(() => {
      const comments = mockComments(topicId);
      resolve(comments.slice(offset, offset + limit));
    }, 1000);
  });
}

export function leaveComment(
  topicId: string,
  text: string,
  authorId: number,
): Promise<void> {
  void topicId;
  void text;
  void authorId;
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('Комментарий улетел на сервер');
      resolve();
    }, 1000);
  });
}

/* eslint-enable no-void */
