const validateSkill = (req, res, next) => {
  const { name, category } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('Skill name is required');
  }
  if (!category || typeof category !== 'string' || category.trim() === '') {
    errors.push('Category is required');
  }

  if (errors.length > 0) {
    res.status(400);
    return next(new Error(errors.join('; ')));
  }

  next();
};

export default validateSkill;
