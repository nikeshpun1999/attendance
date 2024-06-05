const app = require('./app');
const config = require('./config');

const PORT = process.env.PORT || config.port;

const server = app.listen(PORT, async () => {
  console.log('server is running on port', server.address().port);
});
