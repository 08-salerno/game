import { DataTypes, Model } from 'sequelize';
import dbClient from '../db-client';

export class UserTheme extends Model {}

UserTheme.init({
  userId: { type: DataTypes.INTEGER, primaryKey: true },
  themeId: DataTypes.INTEGER,
}, {
  sequelize: dbClient,
});
