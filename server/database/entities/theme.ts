import { DataTypes, Model } from 'sequelize';
import dbClient from '../db-client';

export class Theme extends Model {}

Theme.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
}, {
  sequelize: dbClient,
});
