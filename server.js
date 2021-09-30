const express = require('express');
const path = require('path');
const cors = require('cors');

const PORT = 9000;

const STATIC = path.resolve(__dirname, 'dist');
const INDEX = path.resolve(STATIC, 'index.html');

const app = express();
app.use(cors({
  origin: 'https://ya-praktikum.tech',
}));

// Static content
app.use(express.static(STATIC));

// All GET request handled by INDEX file
app.get('*', (req, res) => {
  res.sendFile(INDEX);
});

// Start server
app.listen(PORT, () => {
  console.log('Server up and running on ', `http://localhost:${PORT}/`);
});
