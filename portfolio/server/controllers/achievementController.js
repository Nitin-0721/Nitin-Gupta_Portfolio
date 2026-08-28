import Achievement from '../models/Achievement.js';

/**
 * Get all achievements sorted by order.
 * GET /api/achievements
 */
export const getAchievements = async (req, res, next) => {
  try {
    const achievements = await Achievement.find().sort({ order: 1 });
    res.status(200).json({
      success: true,
      data: achievements
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new achievement.
 * POST /api/achievements
 */
export const createAchievement = async (req, res, next) => {
  try {
    const { title, description, organization, date, url, order } = req.body;
    const achievement = await Achievement.create({
      title,
      description,
      organization,
      date,
      url,
      order
    });
    res.status(201).json({
      success: true,
      data: achievement
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an achievement.
 * PUT /api/achievements/:id
 */
export const updateAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!achievement) {
      res.status(404);
      throw new Error('Achievement not found');
    }
    res.status(200).json({
      success: true,
      data: achievement
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete an achievement.
 * DELETE /api/achievements/:id
 */
export const deleteAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      res.status(404);
      throw new Error('Achievement not found');
    }
    await achievement.deleteOne();
    res.status(200).json({
      success: true,
      message: 'Achievement deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
