import Skill from '../models/Skill.js';

/**
 * Get all skills sorted by category and order.
 * GET /api/skills
 */
export const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    res.status(200).json({
      success: true,
      data: skills
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new skill.
 * POST /api/skills
 */
export const createSkill = async (req, res, next) => {
  try {
    const { name, category, order } = req.body;
    const skill = await Skill.create({ name, category, order });
    res.status(201).json({
      success: true,
      data: skill
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing skill.
 * PUT /api/skills/:id
 */
export const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!skill) {
      res.status(404);
      throw new Error('Skill not found');
    }
    res.status(200).json({
      success: true,
      data: skill
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a skill.
 * DELETE /api/skills/:id
 */
export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      res.status(404);
      throw new Error('Skill not found');
    }
    await skill.deleteOne();
    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
