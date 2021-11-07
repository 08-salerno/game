const { app } = require('./dist/server.js');

const port = process.env.PORT || 9004;

app.listen(port, () => {
  console.log('Application is started on localhost:', port);
});
