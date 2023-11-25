const express = require('express');
const morgan = require('morgan');

const studentRouter = require('./routes/studentRoutes');
const vacancyRouter = require('./routes/vacancyRoutes');
const app = express();

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  // console.log('Hello from the middleware 👋');
  next();
});

// 3) ROUTES
app.use('/api/students', studentRouter);
app.use('/api/vacancies', vacancyRouter);

module.exports = app;
