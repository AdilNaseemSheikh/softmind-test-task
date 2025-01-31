const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION. Shutting down...');
  console.log('💣', err, '💣');
  process.exit(1);
});

const DB = process.env.DB_URL.replace('<db_password>', process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then((con) => console.log('DB connection successfull'))
  .catch((err) => console.log(`💣Error while connecting to DB. \n${err}`));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION. Shutting down...');
  console.log('💣', err, '💣');
  server.close(() => {
    process.exit(1);
  });
});
