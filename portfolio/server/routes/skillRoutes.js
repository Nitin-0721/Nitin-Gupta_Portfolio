import express from 'express';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillController.js';
import validateSkill from '../validators/validateSkill.js';
import validateObjectId from '../validators/validateObjectId.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getSkills);
router.post('/', protect, validateSkill, createSkill);
router.put('/:id', protect, validateObjectId('id'), validateSkill, updateSkill);
router.delete('/:id', protect, validateObjectId('id'), deleteSkill);

export default router;
