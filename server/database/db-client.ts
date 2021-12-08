import { Sequelize } from 'sequelize';

const client = new Sequelize({
  dialect: 'postgres',
  username: process.env.APP_DB_USER!,
  host: process.env.APP_DB_HOST!,
  password: process.env.APP_DB_PASS!,
  port: Number(process.env.APP_DB_PORT!),
});

export default client;
