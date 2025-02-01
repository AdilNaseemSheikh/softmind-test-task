const AppError = require('../utils/appError');

function handleCastErrorDB(err) {
  // handle cast error, user types invalid value
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
}

const handleDuplicateFieldsDB = (err) => {
  // if user tries to create a record with duplicate field which we marked unique in schema

  const value = err.keyValue.name || '';
  const message = `Duplicate field value: ${value}. Please use another value!`;

  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError('Invalid token. Please login again.', 401);

const handleJWTExpireError = (err) =>
  new AppError('Your token has expired. Please login again.', 401);

const handleValidationErrorDB = (err) => {
  const errors = Object.entries(err.errors).map(([_, value]) => value.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  console.log('Error 💣', err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // this error is caused by users activity, so we want them to know what they are doing wrong
  // (invalid input, trying to access protected route etc),
  // hence a meaningful and exact error
  if (err.isOperational) {
    console.log('Operational error 💣', err);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('error not operational 💣', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong :(', // this is a system error, so a generic message to the user
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // in development, we just see what is going wrong in console, mostly
  if (process.env.NODE_ENV === 'development') sendErrorDev(err, res);
  else {
    // but in prodcution, we want user to know what the heck gone wrong
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (err.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (err.name === 'TokenExpiredError') error = handleJWTExpireError(error);

    sendErrorProd(error, res);
  }
};
