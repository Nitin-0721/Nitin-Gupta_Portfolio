/**
 * Centralized error handler middleware.
 * Returns formatted JSON error responses and hides stack traces in production.
 */
const errorMiddleware = (err, req, res, next) => {
  // If headers have already been sent, delegate to default Express handler
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

export default errorMiddleware;
