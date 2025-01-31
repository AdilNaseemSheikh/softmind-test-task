class AppError extends Error {
  
  constructor(message, statusCode) {
    console.log('....xxx');
    super(message); // calling parent which is Error now, and Error accepts message

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // fail for 400 and error for 500
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
