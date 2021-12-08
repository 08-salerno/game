import { DataTypes, Model } from 'sequelize';
import dbClient from '../db-client';
import { TimestampsAttributes } from '../sequelize/timestamps-attributes';
import { Comment } from './comment';

interface TopicAttributes {
  id: number;
  title: string;
  authorId: number;
  readonly commentsCount: number;
}

type TopicCreationAttributes = Omit<TopicAttributes, 'id' | 'commentsCount'>;

export class Topic
  extends Model<TopicAttributes, TopicCreationAttributes>
  implements TopicAttributes, TimestampsAttributes {
  authorId!: number;

  commentsCount!: number;

  readonly createdAt!: Date;

  id!: number;

  title!: string;

  readonly updatedAt!: Date;

  countComments(): Promise<void> {
    return Comment.count({ where: { topicId: this.id } })
      .then((count) => { this.commentsCount = count; })
      .then(() => Promise.resolve());
  }
}

Topic.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    commentsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize: dbClient,
  },
);
