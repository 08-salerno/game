const express = require('express');
const path = require('path');
const cors = require('cors');
const { Client } = require('pg');
// const { Sequelize } = require('sequelize-typescript');

const PORT = process.env.PORT || 3001;

const STATIC = path.resolve(__dirname, 'dist');
const INDEX = path.resolve(STATIC, 'index.html');

// const sequelizeOptions = {
//   host: 'postgres',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   database: 'postgres',
//   dialect: 'postgres', // 'mysql', 'sqlite', 'mariadb', 'mssql'
// };
//
// // eslint-disable-next-line no-unused-vars
// const sequelize = new Sequelize(sequelizeOptions);

const app = express();
app
  .use(
    cors({
      origin: 'https://ya-praktikum.tech',
    }),
  )
  // Static content
  .use(express.static(STATIC))
  // All GET request handled by INDEX file
  .get('*', (req, res) => {
    res.sendFile(INDEX);
  });

// При запуске из docker обязательно host: postgres; port: 5432
// При запуске с хостовой машины host: localhost; port: 5555
const client = new Client({
  user: 'postgres',
  host: 'postgres',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

client
  .connect()
  .then(() => {
    console.log('Server connected to database');

    // Start server
    app.listen(PORT, () => {
      console.log('Server up and running on ', `http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error('Не удалось подключиться к базе');
    console.trace(err);
  });
