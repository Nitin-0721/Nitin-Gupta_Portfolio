const validateAchievement = (req, res, next) => {
  const { title, description } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim() === '') {
    errors.push('Title is required');
  }
  if (!description || typeof description !== 'string' || description.trim() === '') {
    errors.push('Description is required');
  }

  if (errors.length > 0) {
    res.status(400);
    return next(new Error(errors.join('; ')));
  }

  next();
};

export default validateAchievement;
