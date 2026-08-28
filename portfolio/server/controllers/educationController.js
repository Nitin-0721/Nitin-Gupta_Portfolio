import Education from '../models/Education.js';

/**
 * Get all education sorted by order.
 * GET /api/education
 */
export const getEducations = async (req, res, next) => {
  try {
    const educations = await Education.find().sort({ order: 1 });
    res.status(200).json({
      success: true,
      data: educations
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new education record.
 * POST /api/education
 */
export const createEducation = async (req, res, next) => {
  try {
    const { institution, degree, field, location, startDate, endDate, description, order } = req.body;
    const education = await Education.create({
      institution,
      degree,
      field,
      location,
      startDate,
      endDate,
      description,
      order
    });
    res.status(201).json({
      success: true,
      data: education
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an education record.
 * PUT /api/education/:id
 */
export const updateEducation = async (req, res, next) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!education) {
      res.status(404);
      throw new Error('Education record not found');
    }
    res.status(200).json({
      success: true,
      data: education
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete an education record.
 * DELETE /api/education/:id
 */
export const deleteEducation = async (req, res, next) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      res.status(404);
      throw new Error('Education record not found');
    }
    await education.deleteOne();
    res.status(200).json({
      success: true,
      message: 'Education record deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
