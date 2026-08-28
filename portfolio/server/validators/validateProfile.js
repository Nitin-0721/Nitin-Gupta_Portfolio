const validateProfile = (req, res, next) => {
  const { name, professionalTitle, bio, email, location } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('Name is required');
  }
  if (!professionalTitle || typeof professionalTitle !== 'string' || professionalTitle.trim() === '') {
    errors.push('Professional title is required');
  }
  if (!bio || typeof bio !== 'string' || bio.trim() === '') {
    errors.push('Bio is required');
  }
  if (!email || typeof email !== 'string' || email.trim() === '') {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Please provide a valid email address');
  }
  if (!location || typeof location !== 'string' || location.trim() === '') {
    errors.push('Location is required');
  }

  if (errors.length > 0) {
    res.status(400);
    return next(new Error(errors.join('; ')));
  }

  next();
};

export default validateProfile;
