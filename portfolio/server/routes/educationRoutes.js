import express from 'express';
import { getEducations, createEducation, updateEducation, deleteEducation } from '../controllers/educationController.js';
import validateEducation from '../validators/validateEducation.js';
import validateObjectId from '../validators/validateObjectId.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getEducations);
router.post('/', protect, validateEducation, createEducation);
router.put('/:id', protect, validateObjectId('id'), validateEducation, updateEducation);
router.delete('/:id', protect, validateObjectId('id'), deleteEducation);

export default router;
