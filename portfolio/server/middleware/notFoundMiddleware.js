/**
 * Middleware to catch 404 Not Found routes.
 * Creates an error and passes it to the centralized error handler.
 */
const notFoundMiddleware = (req, res, next) => {
  const error = new Error('Route not found');
  res.status(404);
  next(error);
};

export default notFoundMiddleware;
