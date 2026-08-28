const validateEducation = (req, res, next) => {
  const { institution, degree, startDate } = req.body;
  const errors = [];

  if (!institution || typeof institution !== 'string' || institution.trim() === '') {
    errors.push('Institution name is required');
  }
  if (!degree || typeof degree !== 'string' || degree.trim() === '') {
    errors.push('Degree is required');
  }
  if (!startDate || typeof startDate !== 'string' || startDate.trim() === '') {
    errors.push('Start date is required');
  }

  if (errors.length > 0) {
    res.status(400);
    return next(new Error(errors.join('; ')));
  }

  next();
};

export default validateEducation;
