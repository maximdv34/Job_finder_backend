const express = require('express');
const morgan = require('morgan');

const studentRouter = require('./routes/studentRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

// 3) ROUTES
app.use('/api/students', studentRouter);

module.exports = app;
