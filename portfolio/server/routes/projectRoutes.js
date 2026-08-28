import express from 'express';
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import validateProject from '../validators/validateProject.js';
import validateObjectId from '../validators/validateObjectId.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

// Admin-level CRUD operations (protected)
router.post('/', protect, validateProject, createProject);
router.put('/:id', protect, validateObjectId('id'), validateProject, updateProject);
router.delete('/:id', protect, validateObjectId('id'), deleteProject);

export default router;
