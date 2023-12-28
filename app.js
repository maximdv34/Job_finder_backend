const express = require('express');
const morgan = require('morgan');

const studentRouter = require('./routes/studentRoutes');
const vacancyRouter = require('./routes/vacancyRoutes');
const app = express();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});
// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// 3) ROUTES
app.use('/api/students', studentRouter);
app.use('/api/vacancies', vacancyRouter);

module.exports = app;
