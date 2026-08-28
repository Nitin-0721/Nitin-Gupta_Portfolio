/**
 * Middleware to validate Project request bodies.
 * Checks for required fields: title, slug, description, and technologies.
 */
const validateProject = (req, res, next) => {
  const { title, slug, description, technologies } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim() === '') {
    errors.push('Title is required and must be a valid string');
  }

  if (!slug || typeof slug !== 'string' || slug.trim() === '') {
    errors.push('Slug is required and must be a valid string');
  } else if (!/^[a-z0-9-_]+$/.test(slug)) {
    errors.push('Slug must contain only lowercase letters, numbers, hyphens, and underscores');
  }

  if (!description || typeof description !== 'string' || description.trim() === '') {
    errors.push('Description is required and must be a valid string');
  }

  if (!technologies || !Array.isArray(technologies) || technologies.length === 0) {
    errors.push('Technologies must be a non-empty array of strings');
  } else {
    const allValidStrings = technologies.every(tech => typeof tech === 'string' && tech.trim() !== '');
    if (!allValidStrings) {
      errors.push('All items in technologies must be non-empty strings');
    }
  }

  if (errors.length > 0) {
    res.status(400);
    return next(new Error(errors.join('; ')));
  }

  next();
};

export default validateProject;
