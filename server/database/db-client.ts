import { Sequelize } from 'sequelize';

// При запуске из docker обязательно host: postgres; port: 5432
// При запуске с хостовой машины host: localhost; port: 5555
const client = new Sequelize({
  dialect: 'postgres',
  username: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5555,
});

export default client;
