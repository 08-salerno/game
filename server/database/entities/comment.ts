import { DataTypes, Model } from 'sequelize';
import dbClient from '../db-client';
import { Topic } from './topic';
import { TimestampsAttributes } from '../sequelize/timestamps-attributes';

interface CommentAttributes {
    id: number;
    text: string;
    topicId: number;
    authorId: number;
}

type CommentCreationAttributes = Omit<CommentAttributes, 'id'>

export class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes, TimestampsAttributes {
    authorId!: number;

    readonly createdAt!: Date;

    id!: number;

    text!: string;

    topicId!: number;

    readonly updatedAt!: Date;
}

Comment.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: DataTypes.STRING,
  topicId: {
    type: DataTypes.INTEGER,
    references: {
      model: Topic,
      key: 'id',
    },
  },
  authorId: DataTypes.INTEGER,
}, {
  sequelize: dbClient,
});
