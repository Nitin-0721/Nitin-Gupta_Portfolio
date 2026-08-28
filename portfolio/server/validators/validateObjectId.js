import mongoose from 'mongoose';

/**
 * Middleware to validate that the request parameter is a valid MongoDB ObjectId.
 * Prevents Mongoose casting errors from crashing the application.
 */
const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      return next(new Error('Invalid ID format'));
    }
    next();
  };
};

export default validateObjectId;
