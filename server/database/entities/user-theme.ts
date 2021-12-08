import { DataTypes, Model } from 'sequelize';
import dbClient from '../db-client';

interface UserThemeAttributes {
    userId: number;
    themeId: number;
}

type UserThemeCreationAttributes = UserThemeAttributes

export class UserTheme extends Model<UserThemeAttributes, UserThemeCreationAttributes> implements UserThemeAttributes {
    themeId!: number;

    userId!: number;
}

UserTheme.init({
  userId: { type: DataTypes.INTEGER, primaryKey: true },
  themeId: DataTypes.INTEGER,
}, {
  sequelize: dbClient,
});
