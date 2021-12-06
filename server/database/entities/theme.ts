import { DataTypes, Model } from 'sequelize';
import dbClient from '../db-client';

interface ThemeAttributes {
    id: number;
    name: string;
}

type ThemeCreationAttributes = Omit<ThemeAttributes, 'id'>

export class Theme extends Model<ThemeAttributes, ThemeCreationAttributes> implements ThemeAttributes {
    static LIGHT='light'

    static DARK='dark'

    id!: number;

    name!: string;

    static findOrCreateLight(): Promise<[Theme, boolean]> {
      return Theme.findOrCreate({ where: { name: Theme.LIGHT } });
    }

    static findOrCreateDark(): Promise<[Theme, boolean]> {
      return Theme.findOrCreate({ where: { name: Theme.DARK } });
    }
}

Theme.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
}, {
  sequelize: dbClient,
  indexes: [
    {
      unique: true,
      fields: ['name'],
    },
  ],
});
