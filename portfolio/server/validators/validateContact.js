/**
 * Middleware to validate Contact request bodies.
 * Checks for name, email, and message.
 */
const validateContact = (req, res, next) => {
  const { name, email, message } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('Name is required');
  }

  if (!email || typeof email !== 'string' || email.trim() === '') {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!message || typeof message !== 'string' || message.trim() === '') {
    errors.push('Message is required');
  }

  if (errors.length > 0) {
    res.status(400);
    return next(new Error(errors.join('; ')));
  }

  next();
};

export default validateContact;
