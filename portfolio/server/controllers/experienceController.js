import Experience from '../models/Experience.js';

/**
 * Get all experience sorted by order.
 * GET /api/experience
 */
export const getExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find().sort({ order: 1 });
    res.status(200).json({
      success: true,
      data: experiences
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new experience.
 * POST /api/experience
 */
export const createExperience = async (req, res, next) => {
  try {
    const { company, position, location, startDate, endDate, current, description, technologies, order } = req.body;
    const experience = await Experience.create({
      company,
      position,
      location,
      startDate,
      endDate,
      current,
      description,
      technologies,
      order
    });
    res.status(201).json({
      success: true,
      data: experience
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an experience.
 * PUT /api/experience/:id
 */
export const updateExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!experience) {
      res.status(404);
      throw new Error('Experience not found');
    }
    res.status(200).json({
      success: true,
      data: experience
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete an experience.
 * DELETE /api/experience/:id
 */
export const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      res.status(404);
      throw new Error('Experience not found');
    }
    await experience.deleteOne();
    res.status(200).json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
