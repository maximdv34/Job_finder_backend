const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtExeption', (err) => {
  console.log(err.name, err.message);
  console.log('Shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('connection DB successful');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

