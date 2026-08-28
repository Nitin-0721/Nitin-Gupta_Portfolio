import express from 'express';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController.js';
import validateExperience from '../validators/validateExperience.js';
import validateObjectId from '../validators/validateObjectId.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getExperiences);
router.post('/', protect, validateExperience, createExperience);
router.put('/:id', protect, validateObjectId('id'), validateExperience, updateExperience);
router.delete('/:id', protect, validateObjectId('id'), deleteExperience);

export default router;
