const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const markup = fs.readFileSync('./views/index.html', 'utf-8');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).send(markup);
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/users', userRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server :(`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
