// src/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Custom error handling logic
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Server Error';
  let code = err.code || 'SERVER_ERROR';

  // Prisma error handling
  if (err.code === 'P2002') {
    statusCode = 400;
    message = 'Unique constraint violation';
    code = 'UNIQUE_CONSTRAINT_VIOLATION';
  } else if (err.code === 'P2025') {
    statusCode = 404;
    message = 'Record not found';
    code = 'RECORD_NOT_FOUND';
  }

  res.status(statusCode).json({
    error: {
      message: message,
      code: code,
    },
  });
};

export default errorHandler;
