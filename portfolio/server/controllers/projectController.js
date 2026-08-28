import Project from '../models/Project.js';

/**
 * Get all projects, sorted by `order` ascending.
 * GET /api/projects
 */
export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single project by its unique slug.
 * GET /api/projects/:slug
 */
export const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug.toLowerCase() });
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new portfolio project.
 * POST /api/projects
 */
export const createProject = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      description,
      technologies,
      features,
      githubUrl,
      liveUrl,
      image,
      category,
      order
    } = req.body;

    const lowercaseSlug = slug.toLowerCase();

    // Check unique slug constraint
    const existingProject = await Project.findOne({ slug: lowercaseSlug });
    if (existingProject) {
      res.status(400);
      throw new Error('A project with that slug already exists');
    }

    const project = await Project.create({
      title,
      slug: lowercaseSlug,
      description,
      technologies,
      features,
      githubUrl,
      liveUrl,
      image,
      category,
      order
    });

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing project by MongoDB ID.
 * PUT /api/projects/:id
 */
export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    // If slug is being updated, verify it is unique
    if (req.body.slug) {
      const lowercaseSlug = req.body.slug.toLowerCase();
      if (lowercaseSlug !== project.slug) {
        const existingProject = await Project.findOne({ slug: lowercaseSlug });
        if (existingProject) {
          res.status(400);
          throw new Error('A project with that slug already exists');
        }
        req.body.slug = lowercaseSlug;
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedProject
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a project by MongoDB ID.
 * DELETE /api/projects/:id
 */
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
