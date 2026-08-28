const validateExperience = (req, res, next) => {
  const { company, position, startDate, description } = req.body;
  const errors = [];

  if (!company || typeof company !== 'string' || company.trim() === '') {
    errors.push('Company name is required');
  }
  if (!position || typeof position !== 'string' || position.trim() === '') {
    errors.push('Position is required');
  }
  if (!startDate || typeof startDate !== 'string' || startDate.trim() === '') {
    errors.push('Start date is required');
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

export default validateExperience;
